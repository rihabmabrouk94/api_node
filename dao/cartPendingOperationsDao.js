const {
    baseModelDao
} = require('./baseModalDao');
var sequelize = require('sequelize');
var db = require('../models');
var moment = require('moment');
var amqp = require('amqplib/callback_api');

class cartPendingOperationsDao extends baseModelDao {
    constructor() {
        super('cart_pending_operations', 'cart_pending_operation_id');
        this.baseModal = 'cart_pending_operations';
        this.primaryKey = 'cart_pending_operation_id';
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------- API : cart_pending_operation/get_quantities_by_hour -----------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    quantity_operation_by_hour(req, res, next) {


        let db = require('../models');
        let state_date = req.query.state_date;
        let _this = this
        let statsData = [];
        let sqlBundle = 'SELECT \n' +
            'cpo.bundle_id, b.code_bundle, b.num_bundle\n' +
            'FROM views_cps_data as vcpsd\n' +
            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
            'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
            'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
            'GROUP BY vcpsd.date_operation, \n' +
            'cpo.bundle_id, b.code_bundle, b.num_bundle';

        db.sequelize.query(sqlBundle, {
            type: db.sequelize.QueryTypes.SELECT
        })
            .then(Bundles => {
                let i = 0;


                if (Bundles.length === 0) {
                    res.send({
                        data: statsData,
                        success: true

                    })
                }
                Bundles.forEach(itemBundle => {

                    this.allOperationsByBundles(itemBundle.bundle_id).then(allOperationsByBundle => {

                        let sql = 'SELECT vcpsd.cart_pendingoperation_id, cpo.operation_id,\n' +
                            'SUM(vcpsd.quantity) as total_op_quantity,\n' +
                            'vcpsd.date_operation,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            '\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            '\n' +
                            'WHERE cpo.bundle_id = ' + itemBundle.bundle_id + ' AND vcpsd.date_operation = \'' + state_date + '\'\n' +
                            '\n' +
                            'GROUP BY vcpsd.date_operation,\n' +
                            'vcpsd.cart_pendingoperation_id,\n' +
                            'cpo.operation_id,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'ORDER BY  vcpsd.date_hour_operation ASC, vcpsd.cart_pendingoperation_id ASC';

                        db.sequelize.query(sql, {
                            type: db.sequelize.QueryTypes.SELECT
                        }).then(operation_day => {

                            // les operations du jour
                            _this.quantitiesByhour(itemBundle.bundle_id, allOperationsByBundle, operation_day).then(allOperationsHours => {


                                statsData.push({
                                    bundle_id: itemBundle.bundle_id,
                                    code_bundle: itemBundle.code_bundle,
                                    num_bundle: itemBundle.num_bundle,
                                    allOperations: allOperationsHours,
                                    operations_day: operation_day
                                });

                                if (statsData.length === Bundles.length) {

                                    let statsData_result = []
                                    statsData.forEach(bundle_item => {

                                        _this.hoursDay().then(hours => {

                                            let item = {
                                                bundle_id: bundle_item.bundle_id,
                                                code_bundle: bundle_item.code_bundle,
                                                num_bundle: bundle_item.num_bundle,
                                                day: []
                                            }

                                            _this.stats_produced_quantity(bundle_item).then(bundle_result => {

                                                item.day = bundle_result.day
                                                statsData_result.push(item)
                                                if (statsData_result.length === statsData.length) {
                                                    res.send({
                                                        //   statsData: statsData,
                                                        data: statsData_result
                                                    });
                                                    return
                                                }

                                            })


                                        })
                                    })


                                }
                            })

                        })

                    })

                })

            })
    }

    stats_produced_quantity_week(days, bundle_item) {
        let _this = this
        var total = 0
        return new Promise(function (resolve, reject) {

            //  let hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']

            var bundleResult = {
                bundle_id: bundle_item.bundle_id,
                code_bundle: bundle_item.code_bundle,
                num_bundle: bundle_item.num_bundle
            }
            bundleResult.day = []

            var promise1 = new Promise(function (resolve, reject) {
                var dataSolde = []
                days.forEach(day => {
                    // les operations

                    var quantity_operations_hour = []
                    var promise2 = new Promise(function (resolve, reject) {

                        let j = 0
                        // les operations d'un bundle
                        bundle_item.allOperations.forEach(bundle_operation_day => {

                            // les heurs d'une operation
                            var promise3 = new Promise(function (resolve, reject) {

                                let k = 0
                                bundle_operation_day.day.forEach(operation_item_day => {


                                    if (operation_item_day.day === day) {
                                        quantity_operations_hour.push(parseInt(operation_item_day.quantity))
                                    }

                                    if (k === bundle_operation_day.day.length - 1) {


                                        resolve(quantity_operations_hour)
                                    }
                                    k++
                                })
                            })


                            if (j === bundle_item.allOperations.length - 1) {
                                resolve({
                                    day: day,
                                    cpo_id: bundle_operation_day.cpo_id,
                                    operation_quantity: quantity_operations_hour
                                })
                            }
                            j++
                        })

                    })


                    Promise.all([promise2]).then(function (quantity_operation) {

                        // modifier la quantité : quantité + solde
                        var quantityWithSolde = new Promise(function (resolve, reject) {
                            let i = 0
                            var quantity_op_Data = []
                            if (dataSolde.length != 0) {
                                quantity_operation[0].operation_quantity.forEach(item_operation_quantity => {
                                    quantity_operation[0].operation_quantity[i] = item_operation_quantity + dataSolde[i]
                                    i++

                                    if (quantity_operation[0].operation_quantity.length === i) {
                                        dataSolde = []
                                        resolve(quantity_operation)
                                    }
                                })
                            }

                        })

                        let min = 0
                        if (Math.min.apply(Math, quantity_operation[0].operation_quantity) !== Infinity) {
                            min = Math.min.apply(Math, quantity_operation[0].operation_quantity)
                        }

                        // Modifier dataSolde
                        var dataSoldPromise = new Promise(function (resolve, reject) {
                            let i = 0
                            quantity_operation[0].operation_quantity.forEach(item_operation_quantity => {

                                dataSolde[i] = (Number(item_operation_quantity) - min)

                                if (i === quantity_operation[0].operation_quantity.length - 1) {
                                    resolve(dataSolde)
                                }
                                i++
                            })


                        })

                        total = total + min
                        bundleResult.day.push({
                            day: day,
                            quantity_produced: min,
                            total: total,
                            dataSolde: dataSolde
                        })

                        if (bundleResult.day.length === days.length) {
                            resolve(bundleResult)
                        }

                    });

                })

            });

            Promise.all([promise1]).then(function (values) {
                resolve(bundleResult);
                return
            })


        })
    }

    stats_produced_quantity(bundle_item) {
        let _this = this
        var total = 0
        return new Promise(function (resolve, reject) {

            let hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']

            var bundleResult = {
                bundle_id: bundle_item.bundle_id,
                code_bundle: bundle_item.code_bundle,
                num_bundle: bundle_item.num_bundle
            }
            bundleResult.day = []

            var promise1 = new Promise(function (resolve, reject) {
                var dataSolde = []
                hours.forEach(hour => {
                    // les operations

                    var quantity_operations_hour = []
                    var promise2 = new Promise(function (resolve, reject) {

                        let j = 0
                        // les operations d'un bundle
                        bundle_item.allOperations.forEach(bundle_operation_day => {

                            // les heurs d'une operation
                            var promise3 = new Promise(function (resolve, reject) {

                                let k = 0
                                bundle_operation_day.day.forEach(operation_item_day => {
                                    if (operation_item_day.HH === hour) {
                                        quantity_operations_hour.push(parseInt(operation_item_day.quantity))
                                    }

                                    if (k === bundle_operation_day.day.length - 1) {


                                        resolve(quantity_operations_hour)
                                    }
                                    k++
                                })
                            })


                            if (j === bundle_item.allOperations.length - 1) {
                                resolve({
                                    hour: hour,
                                    cpo_id: bundle_operation_day.cpo_id,
                                    operation_quantity: quantity_operations_hour
                                })
                            }
                            j++
                        })

                    })


                    Promise.all([promise2]).then(function (quantity_operation) {

                        // modifier la quantité : quantité + solde
                        var quantityWithSolde = new Promise(function (resolve, reject) {
                            let i = 0
                            var quantity_op_Data = []
                            if (dataSolde.length != 0) {
                                quantity_operation[0].operation_quantity.forEach(item_operation_quantity => {
                                    quantity_operation[0].operation_quantity[i] = item_operation_quantity + dataSolde[i]
                                    i++

                                    if (quantity_operation[0].operation_quantity.length === i) {
                                        dataSolde = []
                                        resolve(quantity_operation)
                                    }
                                })
                            }

                        })

                        let min = 0
                        if (Math.min.apply(Math, quantity_operation[0].operation_quantity) !== Infinity) {
                            min = Math.min.apply(Math, quantity_operation[0].operation_quantity)
                        }

                        // Modifier dataSolde
                        var dataSoldPromise = new Promise(function (resolve, reject) {
                            let i = 0
                            quantity_operation[0].operation_quantity.forEach(item_operation_quantity => {

                                dataSolde[i] = (Number(item_operation_quantity) - min)

                                if (i === quantity_operation[0].operation_quantity.length - 1) {
                                    resolve(dataSolde)
                                }
                                i++
                            })


                        })

                        total = total + min
                        bundleResult.day.push({
                            HH: hour,
                            quantity_produced: min,
                            total: total,
                            dataSolde: dataSolde
                        })

                        if (bundleResult.day.length === hours.length) {
                            resolve(bundleResult)
                        }

                    });

                })

            });

            Promise.all([promise1]).then(function (values) {
                resolve(bundleResult);
                return
            })


        })
    }


    // les operations du jour

    quantitiesByhour(bundle_id, allOperationsByBundle, operations_by_day) {
        let _this = this
        let i = 0
        return new Promise(function (resolve, reject) {

            allOperationsByBundle.forEach(itemOperation => {


                _this.hoursDay().then(hours => {

                    itemOperation.day = []


                    _this.resetHours(hours, itemOperation).then(operation_with_hours => {
                        itemOperation = operation_with_hours

                        _this.operation_quantityDay(itemOperation, operations_by_day).then(itemOperation_quantity => {

                            itemOperation = itemOperation_quantity

                        })


                    })

                })


                if (i === allOperationsByBundle.length - 1) {
                    resolve(allOperationsByBundle)
                }
                i++
            })
        })
    }

    quantitiesByDay(start_date, end_date, bundle_id, allOperationsByBundle, operations_by_day) {
        let _this = this
        let i = 0
        return new Promise(function (resolve, reject) {


            allOperationsByBundle.forEach(itemOperation => {


                _this.days(start_date, end_date).then(days => {

                    itemOperation.day = []


                    _this.resetDays(days, itemOperation).then(operation_with_hours => {

                        console.log('reeeeessseeeeeeeeet', operation_with_hours)
                        itemOperation = operation_with_hours

                        _this.operation_quantityDay_week(itemOperation, operations_by_day).then(itemOperation_quantity => {

                            itemOperation = itemOperation_quantity

                        })


                    })

                })
                if (i === allOperationsByBundle.length - 1) {
                    resolve(allOperationsByBundle)
                }
                i++
            })
        })
    }

    operation_quantityDay_week(itemOperation, operations_by_day) {
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {

            console.log('operation_quantityDay_weekkkkkkkkkkkkkkkk', itemOperation.day)

            itemOperation.day.forEach(item_day => {

                let j = 0

                console.log('item day', item_day)
                _this.operation_quantity_item_day_week(itemOperation.cpo_id, item_day, operations_by_day).then(item_day_quantity => {

                    item_day = item_day_quantity

                })
                if (j === itemOperation.day.length - 1) {
                    resolve(itemOperation);
                    return
                }
                j++


            })

        })
    }

    operation_quantity_item_day_week(cpo_id, item_day, operations_by_day) {
        console.log('operation qt day week', item_day, operations_by_day.length)
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {

            operations_by_day.forEach(item_operationDay => {

                console.log(' item_operationDay.date_operation', item_operationDay.date_operation, item_day.day)
                if (item_operationDay.cart_pendingoperation_id === cpo_id && item_operationDay.date_operation === item_day.day) {

                    item_day.quantity = item_operationDay.total_op_quantity
                    resolve(item_day)
                }

                i++

                if (i === operations_by_day.length) {
                    resolve(item_day)
                }


            })

        })
    }

    operation_quantityDay(itemOperation, operations_by_day) {
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {


            itemOperation.day.forEach(item_day => {

                let j = 0

                _this.operation_quantity_item_day(itemOperation.cpo_id, item_day, operations_by_day).then(item_day_quantity => {

                    item_day = item_day_quantity

                })
                if (j === itemOperation.day.length - 1) {
                    resolve(itemOperation);
                    return
                }
                j++


            })

        })
    }

    operation_quantity_item_day(cpo_id, item_day, operations_by_day) {
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {

            operations_by_day.forEach(item_operationDay => {

                if (item_operationDay.cart_pendingoperation_id === cpo_id && item_operationDay.date_hour_operation.substr(8, 2) === item_day.HH) {

                    item_day.quantity = item_operationDay.total_op_quantity
                    resolve(item_day)
                }

                i++

                if (i === operations_by_day.length) {
                    resolve(item_day)
                }


            })

        })
    }

    resetHours(hours, itemOperation) {
        let _this = this
        let i = 0

        return new Promise(function (resolve, reject) {

            hours.forEach(hour => {

                itemOperation.day.push({
                    HH: hour,
                    quantity: 0,

                })

            })
            resolve(itemOperation);
            return

        })
    }

    resetDays(days, itemOperation) {
        let _this = this
        let i = 0

        return new Promise(function (resolve, reject) {


            days.forEach(day => {

                itemOperation.day.push({
                    day: day,
                    quantity: 0,

                })

                if (i === days.length - 1) {
                    resolve(itemOperation);
                    //return
                }
                i++
            })

            resolve(itemOperation);
        })
    }

    hoursDay() {
        let _this = this
        return new Promise(function (resolve, reject) {
            const lastHour = 23
            let hours = []
            for (let i = 0; i < lastHour + 1; i++) {
                let hour = i.toString();
                if (i < 10) {
                    hour = '0' + i;
                }
                hours.push(hour)


            }

            let i = 0
            resolve(hours);
            return
        })
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------- END API : cart_pending_operation/get_quantities_by_hour -------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


    days(start_date, end_date) {
        let i = 0;
        return new Promise(function (resolve, reject) {
            new_date = moment(new_date, "YYYYMMDD")
            var dates = []

            do {
                var new_date = moment(start_date, "YYYYMMDD").add(i, 'days');
                var new_date1 = moment(new_date).format('YYYYMMDD')
                dates.push(new_date1)
                i++;
            } while (new_date1 < end_date);


            resolve(dates);
        })
    }

    produced_quantity_day(req, res, next) {

        let db = require('../models');
        let state_date = req.query.state_date;
        let searchBy = req.query.searchBy;
        var _this = this
        var statsData = [];


        if (searchBy === 'day') {

            let sqlBundle = 'SELECT \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle\n' +
                'FROM views_cps_data as vcpsd\n' +
                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
                'GROUP BY vcpsd.date_operation, \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle';

            db.sequelize.query(sqlBundle, {
                type: db.sequelize.QueryTypes.SELECT
            }).then(Bundles => {
                let i = 0;


                if (Bundles.length === 0) {
                    res.send({
                        data: statsData,
                        success: true
                    })
                }

                Bundles.forEach(itemBundle => {

                    this.allOperationsByBundles(itemBundle.bundle_id).then(allOperationsByBundle => {

                        let sql = 'SELECT vcpsd.cart_pendingoperation_id, cpo.operation_id,\n' +
                            'SUM(vcpsd.quantity) as total_op_quantity,\n' +
                            'vcpsd.date_operation,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            '\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            '\n' +
                            'WHERE cpo.bundle_id = ' + itemBundle.bundle_id + ' AND vcpsd.date_operation = \'' + state_date + '\'\n' +
                            '\n' +
                            'GROUP BY vcpsd.date_operation,\n' +
                            'vcpsd.cart_pendingoperation_id,\n' +
                            'cpo.operation_id,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'ORDER BY  vcpsd.date_hour_operation ASC, vcpsd.cart_pendingoperation_id ASC';

                        db.sequelize.query(sql, {
                            type: db.sequelize.QueryTypes.SELECT
                        }).then(operation_day => {

                            // les operations du jour
                            _this.quantitiesByhour(itemBundle.bundle_id, allOperationsByBundle, operation_day).then(allOperationsHours => {


                                statsData.push({
                                    bundle_id: itemBundle.bundle_id,
                                    code_bundle: itemBundle.code_bundle,
                                    num_bundle: itemBundle.num_bundle,
                                    allOperations: allOperationsHours,
                                    operations_day: operation_day
                                });

                                if (statsData.length === Bundles.length) {

                                    let statsData_result = []
                                    statsData.forEach(bundle_item => {

                                        _this.hoursDay().then(hours => {

                                            let item = {
                                                bundle_id: bundle_item.bundle_id,
                                                code_bundle: bundle_item.code_bundle,
                                                num_bundle: bundle_item.num_bundle,
                                                day: []
                                            }

                                            _this.stats_produced_quantity(bundle_item).then(bundle_result => {

                                                item.day = bundle_result.day
                                                statsData_result.push(item)
                                                if (statsData_result.length === statsData.length) {

                                                    var data_result = []

                                                    var promise1 = new Promise(function (resolve, reject) {
                                                        let i = 0
                                                        hours.forEach(hour => {
                                                            data_result.push({
                                                                HH: hour,
                                                                quantity: 0
                                                            })

                                                            if (hours.length === data_result.length) {

                                                                resolve(data_result)
                                                            }
                                                        })
                                                    })

                                                    Promise.all([promise1]).then(function (cpo_result) {

                                                        var promise2 = new Promise(function (resolve, reject) {

                                                            let i = 0
                                                            data_result.forEach(hour => {


                                                                var promise3 = new Promise(function (resolve, reject) {
                                                                    let j = 0
                                                                    statsData_result.forEach(bundle_item => {

                                                                        var promise4 = new Promise(function (resolve, reject) {

                                                                            let k = 0
                                                                            bundle_item.day.forEach(hour_item => {

                                                                                if (hour.HH === hour_item.HH) {
                                                                                    hour.quantity = hour.quantity + hour_item.quantity_produced
                                                                                }

                                                                                if (k === bundle_item.day.length) {
                                                                                    resolve(data_result)
                                                                                }
                                                                                k++

                                                                            })
                                                                        })

                                                                        if (j === data_result.length - 1) {
                                                                            resolve(data_result)
                                                                        }
                                                                        j++

                                                                    })
                                                                })

                                                                if (i === data_result.length - 1) {
                                                                    resolve(data_result)
                                                                }
                                                                i++
                                                            })
                                                        })

                                                        Promise.all([promise2]).then(function (cpo_result) {
                                                            res.send({
                                                                //   statsData: statsData,
                                                                //Bundle_quantity: statsData_result,
                                                                data: data_result //statsData_result
                                                            });
                                                            return
                                                        })

                                                    })

                                                }

                                            })


                                        })
                                    })


                                }
                            })

                        })

                    })

                })

            })
        } else {

            var start_date = state_date
            var end_date = moment(start_date, "YYYYMMDD").add(5, 'days').format('YYYYMMDD')

            _this.produce_qte_week(start_date, end_date).then(result_data => {

                res.send(result_data)
            })
        }


    }


    produce_qte_week(start_date, end_date) {

        let _this = this
        return new Promise(function (resolve, reject) {


            var statsData = []
            let sqlBundle = 'SELECT \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle\n' +
                'FROM views_cps_data as vcpsd\n' +
                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                'WHERE vcpsd.date_operation between \'' + start_date + '\' and  \'' + end_date + '\'\n' +
                'GROUP BY vcpsd.date_operation, \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle';

            db.sequelize.query(sqlBundle, {
                type: db.sequelize.QueryTypes.SELECT
            }).then(Bundles => {

                if (Bundles.length === 0) {
                    resolve({
                        data: statsData,
                        success: true
                    })
                }

                Bundles.forEach(itemBundle => {

                    _this.allOperationsByBundles(itemBundle.bundle_id).then(allOperationsByBundle => {

                        let sql = 'SELECT vcpsd.cart_pendingoperation_id, cpo.operation_id,\n' +
                            'SUM(vcpsd.quantity) as total_op_quantity,\n' +
                            'vcpsd.date_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            '\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            '\n' +
                            'WHERE cpo.bundle_id = ' + itemBundle.bundle_id + ' AND vcpsd.date_operation between \'' + start_date + '\' and  \'' + end_date + '\'\n' +
                            '\n' +
                            'GROUP BY vcpsd.date_operation,\n' +
                            'vcpsd.cart_pendingoperation_id,\n' +
                            'cpo.operation_id,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            '\n' +
                            'ORDER BY  vcpsd.date_operation ASC, cpo.bundle_id ASC';

                        db.sequelize.query(sql, {
                            type: db.sequelize.QueryTypes.SELECT
                        }).then(operation_day => {

                            // les operations du jour
                            _this.quantitiesByDay(start_date, end_date, itemBundle.bundle_id, allOperationsByBundle, operation_day).then(allOperationsHours => {

                                statsData.push({
                                    bundle_id: itemBundle.bundle_id,
                                    code_bundle: itemBundle.code_bundle,
                                    num_bundle: itemBundle.num_bundle,
                                    allOperations: allOperationsHours,
                                    operations_day: operation_day
                                });

                                if (statsData.length === Bundles.length) {


                                    let statsData_result = []
                                    statsData.forEach(bundle_item => {

                                        _this.days(start_date, end_date).then(days => {

                                            let item = {
                                                bundle_id: bundle_item.bundle_id,
                                                code_bundle: bundle_item.code_bundle,
                                                num_bundle: bundle_item.num_bundle,
                                                day: []
                                            }

                                            _this.stats_produced_quantity_week(days, bundle_item).then(bundle_result => {

                                                item.day = bundle_result.day
                                                statsData_result.push(item)
                                                if (statsData_result.length === statsData.length) {

                                                    var data_result = []

                                                    var promise1 = new Promise(function (resolve, reject) {
                                                        let i = 0
                                                        days.forEach(day => {
                                                            data_result.push({
                                                                day: day,
                                                                quantity: 0
                                                            })

                                                            if (days.length === data_result.length) {

                                                                resolve(data_result)
                                                            }

                                                        })
                                                    })

                                                    Promise.all([promise1]).then(function (cpo_result) {

                                                        var promise2 = new Promise(function (resolve, reject) {

                                                            let i = 0
                                                            data_result.forEach(hour => {


                                                                var promise3 = new Promise(function (resolve, reject) {
                                                                    let j = 0
                                                                    statsData_result.forEach(bundle_item => {

                                                                        var promise4 = new Promise(function (resolve, reject) {

                                                                            let k = 0
                                                                            bundle_item.day.forEach(hour_item => {

                                                                                if (hour.day === hour_item.day) {
                                                                                    hour.quantity = hour.quantity + hour_item.quantity_produced
                                                                                }

                                                                                if (k === bundle_item.day.length) {
                                                                                    resolve(data_result)
                                                                                }
                                                                                k++

                                                                            })
                                                                        })

                                                                        if (j === data_result.length - 1) {
                                                                            resolve(data_result)
                                                                        }
                                                                        j++

                                                                    })
                                                                })

                                                                if (i === data_result.length - 1) {
                                                                    resolve(data_result)
                                                                }
                                                                i++
                                                            })
                                                        })

                                                        Promise.all([promise2]).then(function (cpo_result) {
                                                            resolve({
                                                                //   statsData: statsData,
                                                                //Bundle_quantity: statsData_result,
                                                                data: data_result //statsData_result
                                                            });
                                                            return
                                                        })

                                                    })

                                                }
                                            })


                                        })
                                    })


                                }
                            })

                        })

                    })
                })


            })


        })
    }


    allOperationsByBundles(bundle_id) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            let db = require('../models');

            let _this = this
            let sqlBundle = 'select cart_pending_operation_id as cpo_id, bundle_id, quantity from cart_pending_operations\n' +
                'where bundle_id = ' + bundle_id;

            db.sequelize.query(sqlBundle, {
                type: db.sequelize.QueryTypes.SELECT
            })
                .then(cpo => {
                    resolve(cpo)
                });
        })
    }

    getOperationsByRFID(req, res, next) {


        let rfid = req.body.rfid;
        let _this = this;
        // sortDir : 'DESC',
        //     sortBy : 'user_id'

        let sortDir = req.body.sortDir;
        let sortBy = req.body.sortBy;

        if (sortDir === '' || sortDir === undefined) {
            sortDir = 'DESC'
        }

        if (sortBy === '' || sortBy === undefined) {
            sortBy = 'cart_pending_operation_id'
        }


        let sqlBundle = "SELECT max(cart_id) FROM carts WHERE rfid_cart = '" + rfid + "'";

        // 1. last bundle
        _this.db.sequelize.query(sqlBundle, {
            type: _this.db.sequelize.QueryTypes.SELECT
        })
            .then(cart_id => {


                if (cart_id && cart_id[0]) {

                    //2. find bundle_cart
                    _this.db['bundle_carts'].findOne({
                        where: {
                            cart_id: cart_id[0].max
                        },
                        include: [{
                            model: _this.db['bundles'],
                            include: [{
                                model: _this.db['orders']
                            }]
                        }]
                    }).then(bundle_cart => {

                        if (bundle_cart) {

                            //3.get all operations
                            _this.db['cart_pending_operations'].findAll({
                                where: {
                                    bundle_id: bundle_cart.bundle_id
                                },
                                include: [{
                                    model: _this.db['operations'],
                                    required: false,
                                },
                                    {
                                        model: _this.db['bundles'],
                                        required: false,
                                        include: [{
                                            model: _this.db['orders'],
                                            required: false,
                                            include: [{
                                                model: _this.db['articles'],
                                                required: false,
                                            }]
                                        },
                                            {
                                                model: _this.db['printers'],
                                                required: false
                                            }
                                        ]
                                    },
                                    {
                                        model: _this.db['machines'],
                                        required: false,
                                        include: [{
                                            model: _this.db['machine_types'],
                                            required: false
                                        }]
                                    }
                                ],
                                order: [
                                    [sortBy, sortDir]
                                ]
                            }).then(cpo => {

                                _this.getCPs(cpo).then(dataResult => {
                                    res.send({
                                        success: true,
                                        data: dataResult
                                    });
                                    return
                                })

                            });

                        } else {
                            res.send({
                                success: false,
                                message: 'Cart does not contain bundle',
                            });
                            return;
                        }


                    })

                } else {
                    res.send({
                        success: false,
                        message: 'Cart does not exist',
                    });
                    return
                }
            })
    }

    getCPs(cartPendingOperations) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            let i = 0;
            cartPendingOperations.forEach(cpo => {

                let sqlBundle = 'SELECT distinct(emp.*)\n' +
                    'FROM cart_pending_sessions as cps \n' +
                    'INNER JOIN usersessions as us ON cps.session_id = us.usersession_id\n' +
                    'INNER JOIN employees as emp ON emp.emp_id = us.employee_id\n' +
                    'where cps.cart_pendingoperation_id=' + cpo.cart_pending_operation_id + 'and cps.active = ' + "'" + 'Y' + "'"

                _this.db.sequelize.query(sqlBundle, {
                    type: db.sequelize.QueryTypes.SELECT
                })
                    .then(operators => {

                        cpo.operators = []
                        _this.pushOperatos(cpo, operators).then(resultCpo => {
                            cpo = resultCpo

                            if (i === cartPendingOperations.length - 1) {
                                resolve(cartPendingOperations)
                            }
                            i++
                        })
                    });

            })

            if (cartPendingOperations.length === 0) {
                resolve(cartPendingOperations)
            }
        })
    }

    pushOperatos(cpo, operators) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            let i = 0
            operators.forEach(operator => {
                cpo.operators.push(operator)


                if (i === operators.length - 1) {
                    resolve(cpo)
                }
                i++
            })

            if (operators.length === 0) {
                resolve(cpo)
            }
        })
    }

    getCPSByOperator(req, res, next) {
        let _this = this;
        let emp_id = req.params.emp_id
        let cpo_id = req.params.cpo_id

        console.log('emp_idddd', emp_id)
        return new Promise(function (resolve, reject) {
            _this.db['cart_pending_sessions'].findAll({
                where: {
                    cart_pendingoperation_id: cpo_id,
                    '$usersession.employee.emp_id$': emp_id
                },
                include: [{
                    model: _this.db['usersessions'],
                    include: [{
                        model: _this.db['employees']
                    }]

                }]

            }).then(cps => {
                res.send({
                    data: cps,
                    success: true
                })
            })
        })
    }

    saveBundle(req, res, next) {
        let bundle = req.body.bundle
        var _this = this;
        if (bundle) {
            _this.generateBundle(bundle).then(bundle_generated => {
                res.send({
                    success: true,
                    data: bundle_generated,
                });
            });
        } else {
            res.send({
                success: false,
                data: null,
            });
        }

    }


    generateBundle(bundle_item) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            _this.db['orders'].findOne({where : {
                order_id : bundle_item.order_id
                }}).then(order => {
                bundle_item.num_bundle = bundle_item.code_bundle + '/' + order.code;
                bundle_item.code_bundle = bundle_item.code_bundle + '/' + order.code;
                // bundle_item.printer = {};

                _this.db['bundles'].build(bundle_item).save().then(bundle_saved => {
                    bundle_item.bundle_id = bundle_saved.bundle_id

                    /*if (bundle_item.printer_id) {
                        _this.db['printers'].findOne({
                            where: {
                                printer_id: bundle_item.printer_id
                            }
                        }).then(printer => {
                            bundle_item.printer = printer
                        })
                    }*/

                    _this.bundle_operationsGroup(bundle_item).then(bundle_generated => {
                        // ***********************************************************************************
                        _this.db['orders'].update( {
                                bundle_generated : order.bundle_generated + 1
                            },
                            {where: {
                                order_id: bundle_item.order_id
                                }}
                        ).then(result => {
                            resolve(bundle_generated);
                        })
                    }, err => {
                        resolve(null);
                    })
                })
            })

        })
    }

    saveBundles(req, res, next) {
        let bundles = req.body.bundles
        let order = req.body.order
        var _this = this

        let dataResult = {}
        dataResult.order = {}
        dataResult.bundles = []
        order.total_bundle = bundles.length
        _this.db['orders'].build(order).save().then(save_order => {

            _this.db['orders'].findOne({
                where: {
                    order_id: save_order.order_id
                },
                include: [
                    {
                        model: _this.db['articles']
                    },
                    {
                        model: _this.db['clients']
                    }
                ]
            }).then(order => {
                dataResult.order = order;

                amqp.connect('amqp://localhost', function (error0, connection) {
                    if (error0) {
                        throw error0;
                    }

                    connection.createChannel(function (error1, channel) {
                        if (error1) {
                            throw error1;
                        }
                        var queue = 'marabout.generateBundles';
                        channel.assertQueue(queue, {
                            durable: true
                        });

                        bundles.forEach(itemBundle => {
                            itemBundle.order_id = order.order_id;
                            channel.sendToQueue(queue, Buffer.from(JSON.stringify(itemBundle)));
                        });
                        /*channel.consume(queue,(message)=> {
                            console.log('recived', message.content)
                        }, {noAck: true});*/

                        res.send({
                            success: true,
                            data : [{
                                order: order
                            }]
                        });
                        return;
                        /*Promise.all([_this.generateBundles(bundles, order, dataResult)]).then(bundles_generated => {

                            res.send({
                                success: true,
                                data: bundles_generated[0]
                            })
                        })*/
                    })

                })


            })
        })

    }

    generateBundles(bundles, order, dataResult) {
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {
            bundles.forEach(bundle_item => {
                bundle_item.order_id = order.order_id
                bundle_item.num_bundle = bundle_item.code_bundle + '/' + order.code
                bundle_item.code_bundle = bundle_item.code_bundle + '/' + order.code
                bundle_item.printer = {}

                _this.db['bundles'].build(bundle_item).save().then(bundle_saved => {
                    bundle_item.bundle_id = bundle_saved.bundle_id

                    if (bundle_item.printer_id) {
                        _this.db['printers'].findOne({
                            where: {
                                printer_id: bundle_item.printer_id
                            }
                        }).then(printer => {
                            bundle_item.printer = printer
                        })
                    }

                    _this.bundle_operationsGroup(bundle_item, dataResult).then(bundle_generated => {

                        dataResult.bundles.push(bundle_generated)

                        if (dataResult.bundles.length === bundles.length) {
                            resolve(dataResult)
                        }
                    })
                })
            })
        })
    }

    bundle_operationsGroup(bundle_item) {
        let _this = this;
        let i = 1;
        return new Promise(function (resolve, reject) {
            bundle_item.operation_groups.forEach(operation_group_item => {
                _this.generate_operations(operation_group_item, bundle_item).then(operation_group_item_generated => {
                    operation_group_item = operation_group_item_generated;
                    if (i === bundle_item.operation_groups.length) {
                        resolve(bundle_item);
                        return;
                    }
                    i++;
                });
            })
        })
    }

    generate_operations(operation_group_item, bundle_item) {
        var _this = this;
        let i = 1;
        let k = 1;
        return new Promise(function (resolve, reject) {
            if (operation_group_item && operation_group_item.operations) {
                operation_group_item.operationsTemplate = []
                operation_group_item.line = {}
                _this.db['lines'].findOne({
                    where: {
                        line_id: operation_group_item.line_id
                    }
                }).then(line => {
                    let _promises = [];
                    operation_group_item.line = line;
                    operation_group_item.operations.forEach(operation_template_id => {
                        _promises.push(_this.generateCpoAndSequences(bundle_item, operation_group_item, operation_template_id, i));
                        i++;
                    });

                    Promise.all(_promises).then(() => {
                        console.log('promise all finished')
                        resolve(operation_group_item);
                    });
                }, err => {
                    resolve(operation_group_item);
                });

            } else {
                resolve(operation_group_item);
            }
        })
    }


    generateCpoAndSequences(bundle_item, operation_group_item, operation_template_id, i) {
        let _this = this;

        return new Promise(function (resolve, reject) {

            _this.db['operation_templates'].findOne({
                where: {
                    operation_template_id: operation_template_id
                }
            }).then(operation_template => {
                if (!operation_template) {
                    resolve(operation_group_item);
                    return;
                }

                _this.db['operations'].build({
                    line_id: operation_group_item.line_id,
                    active: 'Y',
                    description: operation_template.description,
                    label: operation_template.label,
                    op_code: operation_template.op_code,
                    machine_type_id: operation_template.machine_type_id,
                    accminprice: operation_template.accminprice,
                    time: operation_template.time,
                    bundle_id: bundle_item.bundle_id,
                    quantity: bundle_item.bundle_qte
                }).save().then(operation => {

                    let pending_carts = {};
                    pending_carts.operation_id = operation.operation_id;
                    pending_carts.finished = 0;
                    pending_carts.bundle_id = bundle_item.bundle_id;
                    pending_carts.datereadbundle = Math.round(+new Date() / 1000);
                    pending_carts.machine_type_id = operation.machine_type_id;
                    pending_carts.quantity = 0;
                    var modalObj = _this.db['cart_pending_operations'].build(pending_carts);

                    modalObj.save().then(result => {
                    }, err => {
                        console.log('err1', err)
                    });

                    _this.generateSequenceOperation(operation, operation_template_id).then((sequence_operation_generated, operation_template_id) => {
                        operation_group_item.operationsTemplate.push(operation_template);
                        resolve(operation_group_item);
                    }, err => {
                        resolve(operation_group_item)
                    });

                });
            }, err => {
                console.log('response err for i', i);
                resolve(operation_group_item);
            })
        });
    }

    generateSequenceOperation(operation, operation_template_id) {
        var _this = this;
        var i = 0;
        let k = 1;
        let sequence_operations_generated = 0;
        return new Promise(function (resolve, reject) {

            _this.db['sequences'].findAll({
                where: {
                    operation_template_id: operation_template_id,
                    active: 'Y'
                }
            }).then(sequences => {

                if (sequences) {

                    _this.generateSequecesForOperation(sequences, operation, operation_template_id).then(cc => {

                        resolve(cc)
                    })

                } else {
                    resolve([], operation_template_id)
                }
            }, err2 => {
                resolve([], operation_template_id)
            });

        })
    }


    generateSequecesForOperation(sequences, operation, operation_template_id) {

        let _this = this

        let sequence_operations_generated = 0

        let promises = []
        return new Promise(function (resolve, reject) {
            sequences.forEach(sequence => {

                promises.push(new Promise(function (resolve, reject) {
                    _this.db['sequence_operations'].build({
                        operation_id: operation.operation_id,
                        stitchcount: sequence.stitchcount,
                        coupe_fil: sequence.coupe_fil,
                        parent_sequence: sequence.parent_sequence,
                        back_stitch: sequence.back_stitch,
                        sequence_order: sequence.sequence_order,
                        picture_id: sequence.picture_id,
                        operation_template_id: operation_template_id,
                        back_stich_positive_tolerence: sequence.back_stich_positive_tolerence,
                        back_stich_negative_tolerence: sequence.back_stich_negative_tolerence,
                        stitchcount_positive_tolerence: sequence.stitchcount_positive_tolerence,
                        stitchcount_negative_tolerence: sequence.stitchcount_negative_tolerence,
                        with_subsequences: sequence.with_subsequences,
                        description: sequence.description,
                        active: 'Y'
                    }).save().then(result1 => {
                        sequence_operations_generated++;


                        resolve(result1)
                        // if (sequence_operations_generated >= sequences.length) {
                        //     resolve(sequences, operation_template_id)
                        // }
                    }, err1 => {
                        sequence_operations_generated++;
                        resolve([])

                        // if (sequence_operations_generated >= sequences.length) {
                        //
                        //
                        //     resolve(sequences, operation_template_id)
                        // }
                    });
                }))


            })

            Promise.all([promises]).then(function (allsequences) {
                resolve(allsequences)
            })

        })
    }


}

module.exports = cartPendingOperationsDao;
