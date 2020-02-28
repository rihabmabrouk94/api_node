const {baseModelDao } = require('./baseModalDao');
var moment = require('moment');
var sequelize = require('sequelize');

class cartPendingSessionsDao extends baseModelDao {
    constructor() {
        super('cart_pending_sessions', 'cart_pending_session_id');
        this.baseModal = 'cart_pending_sessions';
        this.primaryKey = 'cart_pending_session_id';
    }

    cartPendingSessionsByOrder(req, res, next) {

        let _this = this;
        let order_id = req.params.order_id;

        _this.db['cart_pending_sessions'].findAll({
            include: [{
                    model: _this.db['cart_pending_operations'],
                    include: [{
                            model: _this.db['bundles']
                        },
                        {
                            model: _this.db['operations']
                        }
                    ]
                },
                {
                    model: _this.db['usersessions']
                }
            ],
            where: {
                '$cart_pending_operation.bundle.order_id$': order_id
            }
        }).then(bundles => {
            res.send(bundles)
        })
    }

    total_qauntity_by_operator(req, res, next) {
        let _this = this

        let start_date = req.query.start_date
        let line_id = req.query.line_id
        console.log('start_date', start_date)
        var end_date = moment(start_date, "YYYYMMDD").add(5, 'days').format('YYYYMMDD')
        if (line_id  === null || line_id === undefined || line_id === 'all') {
            let sqlBundle = 'select distinct(emp.emp_id), emp.emp_id, emp.emp_name,  emp_lastname \n' +
                'from views_cps_data vcps \n' +
                'LEFT JOIN usersessions as us ON us.usersession_id = vcps.session_id \n' +
                'LEFT JOIN employees as emp ON emp.emp_id = us.employee_id \n' +
                'where vcps.date_operation BETWEEN  \'' + start_date + '\' AND \'' +  end_date + '\' \n'+
                'group by emp.emp_id, vcps.date_operation';

            _this.db.sequelize.query(sqlBundle, {
                type: _this.db.sequelize.QueryTypes.SELECT
            })
                .then(operators => {
                    if (operators && operators.length) {

                        _this.days(start_date, end_date).then(days_range => {

                            _this.operatorByDays(operators, days_range.dates, start_date, end_date, null).then(resOpDays => {
                                res.send({
                                    data: resOpDays,
                                    end_date: end_date,
                                    start_date: start_date
                                })
                            });
                        })
                    } else {
                        res.send({
                            data: []
                        })
                    }
                })
        } else {


            _this.db['lines'].findOne({
                where :  {
                    line_id : line_id,
                    active: 'Y'
                }
            }).then(line => {
                let sqlBundle = 'select distinct(emp.emp_id), emp.emp_id, emp.emp_name, emp.profile_image_id,  emp_lastname, vcps.line_id  \n' +
                    'from views_cps_data vcps \n' +
                    'LEFT JOIN usersessions as us ON us.usersession_id = vcps.session_id \n' +
                    'LEFT JOIN employees as emp ON emp.emp_id = us.employee_id \n' +
                    'where vcps.date_operation BETWEEN  \'' + start_date + '\' AND \'' +  end_date + '\'  and vcps.line_id  =  ' + line_id + '\n'+
                    'group by emp.emp_id, vcps.date_operation, vcps.line_id ';

                _this.db.sequelize.query(sqlBundle, {
                    type: _this.db.sequelize.QueryTypes.SELECT
                })
                    .then(operators => {
                        if (operators && operators.length) {

                            _this.days(start_date, end_date).then(days_range => {

                                _this.operatorByDays(operators, days_range.dates, start_date, end_date, line_id).then(resOpDays => {
                                    res.send({
                                        data: resOpDays,
                                        end_date: end_date,
                                        start_date: start_date
                                    })
                                });
                            })
                        } else {
                            res.send({
                                data: []
                            })
                        }

                    })
            })



        }

    }

    operatorByDays(operators, days, start_date, end_date, line_id) {
        let op_seq = 0
        let operators_result = [];
        let operators_result_finished = 0;
        let _this = this
        return new Promise(function (resolve, reject) {
            operators.forEach(operator => {
                operators_result.push({
                    op_seq: op_seq,
                    operator: operator,
                })
                _this.operatorByDay(operator, days, op_seq, start_date, end_date, line_id).then(res_operator_info => {
                    operators_result_finished++;

                    operators_result[res_operator_info.op_seq].result_days = res_operator_info.result_days;
                    if (operators.length === operators_result_finished) {
                        resolve(operators_result);
                    }
                });
                op_seq++;
            })
        })
    }

    operatorByDay(operator, days, op_seq, start_date, end_date, line_id) {
        let i_day = 0
        let result_days = []
        let _this = this
        return new Promise(function (resolve, reject) {

            if (line_id !== null) {

                var sqlBundle = 'select SUM(vcps.quantity) as total_quantity \n' +
                    'from views_cps_data vcps \n' +
                    'where  vcps.line_id = '+ line_id + ' and vcps.date_operation BETWEEN ' + "'" + start_date + "' and '" + end_date + "'" + ' and vcps.employee_id = ' + operator.emp_id;

            } else {
                var sqlBundle = 'select SUM(vcps.quantity) as total_quantity \n' +
                    'from views_cps_data vcps \n' +
                    'where vcps.date_operation BETWEEN ' + "'" + start_date + "' and '" + end_date + "'" + ' and vcps.employee_id = ' + operator.emp_id;

            }

            _this.db.sequelize.query(sqlBundle, {
                    type: _this.db.sequelize.QueryTypes.SELECT
                })
                .then(total => {
                    console.log(total)
                    let total_week_qt = total[0].total_quantity
                    if (total_week_qt === null) {
                        total_week_qt = 0
                    }

                    operator.total = total_week_qt

                    days.forEach(day => {
                        // console.log(day)

                        if (line_id === null ) {
                            var sqlBundle = 'select SUM(vcps.quantity) as total_quantity, emp.emp_id, vcps.date_operation \n' +
                                'from views_cps_data vcps  \n' +
                                'LEFT JOIN usersessions as us ON us.usersession_id = vcps.session_id \n' +
                                'LEFT JOIN employees as emp ON emp.emp_id = us.employee_id \n' +
                                'where vcps.date_operation = ' + "'" + day + "'" + ' and emp.emp_id = ' + operator.emp_id + ' \n' +
                                'group by emp.emp_id, vcps.date_operation';
                        } else {
                            var sqlBundle = 'select SUM(vcps.quantity) as total_quantity, emp.emp_id, vcps.date_operation \n' +
                                'from views_cps_data vcps  \n' +
                                'LEFT JOIN usersessions as us ON us.usersession_id = vcps.session_id \n' +
                                'LEFT JOIN employees as emp ON emp.emp_id = us.employee_id \n' +
                                'where  vcps.line_id =  ' + line_id + ' and vcps.date_operation = ' + "'" + day + "'" + ' and emp.emp_id = ' + operator.emp_id + ' \n' +
                                'group by emp.emp_id, vcps.date_operation';
                        }


                        _this.db.sequelize.query(sqlBundle, {
                                type: _this.db.sequelize.QueryTypes.SELECT
                            })
                            .then(operator_quantity => {
                                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                let quantity_by_operator = {}
                                quantity_by_operator.date_operation = day
                                quantity_by_operator.total = total_week_qt
                                if (operator_quantity && operator_quantity[0]) {
                                    quantity_by_operator.total_quantity = operator_quantity[0].total_quantity
                                } else {
                                    quantity_by_operator.total_quantity = 0
                                }
                                result_days.push(quantity_by_operator)
                                if (result_days.length === days.length) {
                                    resolve({
                                        result_days: result_days,
                                        op_seq: op_seq
                                    })
                                }


                            });
                        i_day++;
                    })

                })




        })
    }

    days(start_date, end_date) {
        let i = 0;
        console.log('start_date', start_date)
        console.log('end_date', end_date)
        return new Promise(function (resolve, reject) {
            new_date = moment(new_date, "YYYYMMDD")
            var dates = []



            do {
                var new_date = moment(start_date, "YYYYMMDD").add(i, 'days');
                var new_date1 = moment(new_date).format('YYYYMMDD')
                dates.push(new_date1)
                i++;
            } while (new_date1 < end_date);


            resolve({
                dates: dates
            });
        })
    }

    getCpsByDateAndOperator(req, res, next) {

        let date = req.query.date
        let emp_id = req.query.emp_id

        // let sqlBundle = 'select cps.cart_pendingoperation_id, sum(cps.quantity) as quantity, op.quantity as  total_quantity, op.operation_id, op.label , op.op_code, op.description from views_cps_data vcps \n '+
        // 'LEFT JOIN cart_pending_sessions as cps ON vcps.cart_pending_session_id = cps.cart_pending_session_id  \n ' +
        // 'LEFT JOIN cart_pending_operations as cpo ON cpo.cart_pending_operation_id = vcps.cart_pendingoperation_id \n '+
        // 'LEFT JOIN operations as op ON cpo.operation_id = op.operation_id \n'+
        // 'where vcps.date_operation = ' + "'" + date + "'" + ' and employee_id= ' + emp_id + ' \n'+
        // 'group by cps.cart_pendingoperation_id, op.operation_id' 
        let sql = 'select sum(cps.quantity) as quantity, SUM(op.quantity) as total_quantity, op.label, op.op_code, op.description \n'+
        'from views_cps_data vcps \n'+
        'LEFT JOIN cart_pending_sessions as cps ON vcps.cart_pending_session_id = cps.cart_pending_session_id \n'+
        'LEFT JOIN cart_pending_operations as cpo ON cpo.cart_pending_operation_id = vcps.cart_pendingoperation_id \n '+
        'LEFT JOIN operations as op ON cpo.operation_id = op.operation_id \n'+
        'where vcps.date_operation = ' + "'" + date + "'" + ' and employee_id= ' + emp_id + ' \n'+
        'group by op.op_code, op.label, op.description ';
        this.db.sequelize.query(sql, {
                type: this.db.sequelize.QueryTypes.SELECT
            })
            .then(cps => {
                res.send({
                    success: true,
                    data : cps
                })
            })
    }

    getCpsOperation(req, res, next) {
        let date = req.body.date
        let emp_id = req.body.emp_id
        let label = req.body.label

        let sql = 'select cpo.bundle_id, b.code_bundle, cps.cart_pendingoperation_id, sum(cps.quantity) as quantity, op.quantity as  total_quantity, op.operation_id, op.label , op.op_code, op.description from views_cps_data vcps \n' +
        'LEFT JOIN cart_pending_sessions as cps ON vcps.cart_pending_session_id = cps.cart_pending_session_id \n' +
        'LEFT JOIN cart_pending_operations as cpo ON cpo.cart_pending_operation_id = vcps.cart_pendingoperation_id \n' +
        'LEFT JOIN operations as op ON cpo.operation_id = op.operation_id \n' +
        'LEFT JOIN bundles as b ON b.bundle_id = cpo.bundle_id \n '+
        'where vcps.date_operation = \'' + date + '\' and employee_id= ' + emp_id  + ' and op.label = \''  + label  + '\' \n' +
        'group by cps.cart_pendingoperation_id, op.operation_id, cpo.bundle_id, b.code_bundle' ;
        this.db.sequelize.query(sql, {
                type: this.db.sequelize.QueryTypes.SELECT
            })
            .then(cps => {
                res.send({
                    success: true,
                    data : cps
                })
            })
    }

    usersessionStatByDay2(req, res, next) {
        let _this =this;
        let db = require('../models');

        var params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};
        let state_date = req.query.stats_date;

        let session_status = req.query.session_status;

        let line_id = req.query.line_id;

        let order_by = req.query.order_by;
        var sort = req.query.sort;
        let order = ''
        if (order_by != undefined || order_by != '') {
            order = ''
        } else {
            order = 'order by '  + order_by + ' ' + sort
        }

        if (!session_status || session_status === undefined || session_status === 'all' ) {

            if (line_id === undefined || line_id ==='all' || line_id ==='' ) {
                console.log('1')
                let sql = 'SELECT vesd.*,e.*, view_productivity.productivity as productivity \n '+
                'FROM public.views_employee_stats_by_day as vesd \n' +
                'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                'left join views_cps_operations_quantity_productivity_by_day view_productivity on view_productivity.emp_id = vesd.employee_id and vesd.day_session = view_productivity.date_operation \n '+
                'where vesd.day_session = ' + '\'' + state_date +'\'' 
                + '\n ' + order
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })

                    })
            } else {
                console.log('2')
                let sql = 'select DISTINCT(vesd.*) , e.* , view_productivity.productivity as productivity from views_employee_stats_by_day_by_line as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'left join views_cps_operations_quantity_productivity_by_day view_productivity on view_productivity.emp_id = vesd.employee_id and vesd.day_session = view_productivity.date_operation \n' +   
                    'WHERE vesd.day_session = \''+state_date+'\' and line_id = '+ line_id
                    + '\n ' + order
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })
                    })
            }

        }  else {
            if (line_id === undefined || line_id ==='all' ||  line_id ==='' ) {
                console.log('3')

                let sql =   'select DISTINCT(vesd.*) , e.* , view_productivity.productivity as productivity from views_employee_stats_by_day as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'left join views_cps_operations_quantity_productivity_by_day view_productivity on view_productivity.emp_id = vesd.employee_id and vesd.day_session = view_productivity.date_operation \n ' +
                    'WHERE vesd.day_session = \''+state_date+'\'\n and session_status =\''+ session_status+'\'\n'
                     + order
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })

                    })
            } else {
                console.log('4')
                let sql = 'select  DISTINCT(vesd.*) , e.* , view_productivity.productivity as productivity from views_employee_stats_by_day_by_line as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'left join views_cps_operations_quantity_productivity_by_day view_productivity on view_productivity.emp_id = vesd.employee_id and vesd.day_session = view_productivity.date_operation \n ' +
                    'WHERE vesd.day_session = \''+state_date+'\' and line_id = '+ line_id + ' and session_status =\''+ session_status + '\'\n'
                    + '\n ' + order
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })
                    })
            }

        }
    }

    release_operation(req, res, next) {
        let _this = this
        let cps_id = req.query.cps_id


        _this.db['cart_pending_sessions'].findOne(
            {
                where : {
                    cart_pending_session_id : cps_id
                }

            }).then(cps =>  {

                if (cps) {

                    this.db['cart_pending_operations'].update({
                        in_progress: 'N',
                    }, {
                        where: {

                            cart_pending_operation_id: cps.cart_pendingoperation_id,

                        }
                    }).then(result1 => {

                        this.db['cart_pending_sessions'].update({
                            in_progress: 'N',
                        }, {
                            where: {

                                cart_pending_session_id: cps.cart_pending_session_id,

                            }
                        }).then(result1 => {



                        })

                        res.send({
                            data: null,
                            success: true,
                            message :'Operation is released',
                        });

                    })



                } else {

                    res.send(
                        {
                            data: null,
                            success: true,
                            message : 'CPS does not exist'
                        });

                }

        })
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   -------------------------------------------------------------------------- API : produce_quantity_by_line_hours -----------------------------------------------------------------------
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    produce_quantity_by_line_hours(req, res, next) {


        let db = require('../models');
        let state_date = req.query.state_date;
        let line_id = req.query.line_id
        let _this = this
        let statsData = [];
        let sqlBundle = 'SELECT \n' +
            'cpo.bundle_id, b.code_bundle, b.num_bundle\n' +
            'FROM views_cps_data as vcpsd\n' +
            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
            'left join operations op on op.operation_id= cpo.operation_id\n' +
            'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
            'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
            'and op.line_id = ' + line_id +'\n'+
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

                    _this.allOperationsByBundlesAndLine(itemBundle.bundle_id, line_id).then(allOperationsByBundle => {

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
                            'and vcpsd.line_id = ' + line_id  + ' \n' +
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

                                                        hours.forEach(hour => {
                                                            data_result.push({
                                                                HH: hour,
                                                                quantity : 0
                                                            })

                                                            if (data_result.length === hours.length ) {
                                                                resolve(data_result)
                                                            }
                                                        })
                                                    })

                                                    Promise.all([promise1]).then(function (cpo_result) {

                                                        var promise2 = new Promise(function(resolve , reject) {
                                                            let i = 0
                                                            data_result.forEach(hour=> {


                                                                var promise3 = new Promise(function(resolve , reject) {
                                                                    let j = 0
                                                                    statsData_result.forEach(bundle_item => {

                                                                        var promise4 = new Promise(function(resolve , reject) {

                                                                            let k  = 0
                                                                            bundle_item.day.forEach(hour_item => {

                                                                                if (hour.HH === hour_item.HH) {
                                                                                    hour.quantity = hour.quantity + hour_item.quantity_produced
                                                                                }

                                                                                if (k === bundle_item.day.length -1) {
                                                                                    resolve(data_result)
                                                                                }
                                                                                k++

                                                                            })
                                                                        })

                                                                        if (j === statsData_result.length -1 ) {
                                                                            resolve(data_result)
                                                                        }
                                                                        j++
                                                                    })
                                                                })

                                                                if (i === data_result.length -1 ) {
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
    }

    stats_produced_quantity(bundle_item) {
        let _this = this
        var total = 0
        return new Promise(function (resolve, reject) {

            let hours = ['00', '01','02', '03', '04','05', '06','07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19','20','21','22','23']

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

                        // les operations d'un bundle
                        bundle_item.allOperations.forEach(bundle_operation_day => {

                            // les heurs d'une operation
                            var promise3 = new Promise(function (resolve, reject) {

                                bundle_operation_day.day.forEach(operation_item_day => {
                                    if (operation_item_day.HH === hour) {
                                        quantity_operations_hour.push(parseInt(operation_item_day.quantity))
                                    }

                                    setTimeout(resolve, 100, quantity_operations_hour);
                                })
                            })

                            Promise.all([promise3]).then(function (operation_quantity_hour) {
                                setTimeout(resolve, 300, {
                                    hour: hour,
                                    cpo_id: bundle_operation_day.cpo_id,
                                    operation_quantity: operation_quantity_hour[0]
                                });
                            });

                        })

                    })


                    Promise.all([promise2]).then(function (quantity_operation) {


                        var calcul_quantity = new Promise(function (resolve, reject) {

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
                                        }
                                    })
                                }

                                setTimeout(resolve, 300, quantity_operation);
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
                                    i++
                                })

                                setTimeout(resolve, 300, dataSolde);

                            })

                            Promise.all([dataSoldPromise]).then(function (dataSolde) {
                                total = total + min
                                bundleResult.day.push({
                                    HH: hour,
                                    quantity_produced: min,
                                    total: total,
                                    dataSolde: dataSolde
                                })


                            })

                            setTimeout(resolve, 300, bundleResult);

                        })
                        Promise.all([calcul_quantity]).then(function (values) {
                            setTimeout(resolve, 100, values[0]);

                        })


                    });


                })

                //


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

                j++
                if (j === itemOperation.day.length - 1) {
                    resolve(itemOperation);
                    return
                }


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

    allOperationsByBundlesAndLine(bundle_id, line_id) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            let db = require('../models');

            let _this = this
            let sqlBundle = 'select cpo.cart_pending_operation_id as cpo_id, cpo.bundle_id, cpo.quantity \n' +
                'from cart_pending_operations cpo\n' +
                'left join operations op on op.operation_id = cpo.operation_id\n' +
                'where cpo.bundle_id = ' + bundle_id + ' and op.line_id = ' + line_id

            db.sequelize.query(sqlBundle, {
                type: db.sequelize.QueryTypes.SELECT
            })
                .then(cpo => {
                    resolve(cpo)
                });
        })
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------- END API : produce_quantity_by_line_hours -------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   -------------------------------------------------------------------------- API : /produce_quantity_by_line_days -------------------------------------------------------------------
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    produce_qte_ByLine_week(start_date, end_date, line_id) {

        let _this = this
        return new Promise(function(resolve, reject) {



            var statsData = []
            let sqlBundle = 'SELECT \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle\n' +
                'FROM views_cps_data as vcpsd\n' +
                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                'left join operations op on op.operation_id = cpo.operation_id\n' +
                'left join lines l on l.line_id = op.line_id\n'+
                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                'WHERE vcpsd.date_operation between \'' + start_date + '\' and  \'' + end_date + '\'\n and op.line_id =' + line_id + '\n'+
                'GROUP BY vcpsd.date_operation, \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle';

            _this.db.sequelize.query(sqlBundle, {
                type: _this.db.sequelize.QueryTypes.SELECT
            }).then(Bundles => {



                if (Bundles.length === 0) {
                    resolve({
                        data: statsData,
                        success: true
                    })
                }

                Bundles.forEach(itemBundle => {

                    _this.allOperationsByBundles(itemBundle.bundle_id, line_id).then(allOperationsByBundle => {

                        let sql = 'SELECT vcpsd.cart_pendingoperation_id, cpo.operation_id,\n' +
                            'SUM(vcpsd.quantity) as total_op_quantity,\n' +
                            'vcpsd.date_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            'left join operations op on op.operation_id = cpo.operation_id\n'+
                            'WHERE cpo.bundle_id = ' + itemBundle.bundle_id + ' AND vcpsd.date_operation between \'' + start_date + '\' and  \'' + end_date + '\'  and op.line_id = '+ line_id + '\n ' +
                            'GROUP BY vcpsd.date_operation,\n' +
                            'vcpsd.cart_pendingoperation_id,\n' +
                            'cpo.operation_id,\n' +
                            'vcpsd.date_hour_operation,\n' +
                            'cpo.bundle_id,\n' +
                            'cpo.finished\n' +
                            'ORDER BY  vcpsd.date_operation ASC, cpo.bundle_id ASC';

                        _this.db.sequelize.query(sql, {
                            type: _this.db.sequelize.QueryTypes.SELECT
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
                                                        days.dates.forEach(day => {
                                                            data_result.push({
                                                                day: day,
                                                                quantity : 0
                                                            })

                                                            if (days.dates.length ===data_result.length ) {

                                                                resolve(data_result)
                                                            }

                                                        })
                                                    })

                                                    Promise.all([promise1]).then(function (cpo_result) {

                                                        var promise2 = new Promise(function(resolve , reject) {

                                                            let i = 0
                                                            data_result.forEach(hour=> {


                                                                var promise3 = new Promise(function(resolve , reject) {
                                                                    let j = 0
                                                                    statsData_result.forEach(bundle_item => {

                                                                        var promise4 = new Promise(function(resolve , reject) {

                                                                            let k = 0
                                                                            bundle_item.day.forEach(hour_item => {

                                                                                if (hour.day === hour_item.day) {
                                                                                    hour.quantity = hour.quantity + hour_item.quantity_produced
                                                                                }

                                                                                if (k=== bundle_item.day.length ) {
                                                                                    resolve(data_result)
                                                                                }
                                                                                k++

                                                                            })
                                                                        })

                                                                        if (j === data_result.length -1 )
                                                                        {
                                                                            resolve(data_result)
                                                                        }
                                                                        j++

                                                                    })
                                                                })

                                                                if (i ===data_result.length -1 ) {
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

    allOperationsByBundles(bundle_id, line_id) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            var db = require('../models');

            let sqlBundle = 'select cpo.cart_pending_operation_id as cpo_id, cpo.bundle_id, cpo.quantity , op.line_id\n' +
                'from cart_pending_operations cpo\n' +
                'left join operations op on op.operation_id = cpo.operation_id\n' +
                'where cpo.bundle_id = ' + bundle_id + ' and op.line_id = '+ line_id

           db.sequelize.query(sqlBundle, {
                type: db.sequelize.QueryTypes.SELECT
            })
                .then(cpo => {
                    resolve(cpo)
                });
        })
    }

    resetDays(days, itemOperation) {
        let _this = this
        let i = 0

        return new Promise(function (resolve, reject) {


            days.dates.forEach(day => {

                itemOperation.day.push({
                    day: day,
                    quantity: 0,

                })

                if (i=== days.length -1 ) {
                    resolve(itemOperation);
                    //return
                }
                i++
            })

            resolve(itemOperation);
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

    stats_produced_quantity_week(days, bundle_item) {
        let _this = this
        var total = 0
        return new Promise(function (resolve, reject) {

            var bundleResult = {
                bundle_id: bundle_item.bundle_id,
                code_bundle: bundle_item.code_bundle,
                num_bundle: bundle_item.num_bundle
            }
            bundleResult.day = []

            var promise1 = new Promise(function (resolve, reject) {
                var dataSolde = []
                days.dates.forEach(day => {
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

                                    if (k === bundle_operation_day.day.length -1 ) {


                                        resolve(quantity_operations_hour)
                                    }
                                    k++
                                })
                            })


                            if (j === bundle_item.allOperations.length -1 ) {
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

                                if (i === quantity_operation[0].operation_quantity.length -1) {
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

                        if (bundleResult.day.length === days.dates.length) {
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

    operation_quantityDay_week(itemOperation, operations_by_day) {
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {


            itemOperation.day.forEach(item_day => {

                let j = 0

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
        console.log('operation qt day week',item_day, operations_by_day.length)
        let _this = this
        let i = 0
        let quantity = 0
        return new Promise(function (resolve, reject) {

            operations_by_day.forEach(item_operationDay => {

                if (item_operationDay.cart_pendingoperation_id === cpo_id && item_operationDay.date_operation === item_day.day) {

                    item_day.quantity = item_operationDay.total_op_quantity
                    resolve(item_day)
                }


                if (i === operations_by_day.length-1) {
                    resolve(item_day)
                }

                i++

            })

        })
    }

    produce_quantity_by_line_days(req, res, next) {

        let _this = this
        var start_date = req.query.state_date

        let line_id = req.query.line_id

        var end_date = moment(start_date, "YYYYMMDD").add(5, 'days').format('YYYYMMDD')

        _this.produce_qte_ByLine_week(start_date, end_date, line_id).then(result_data => {

            res.send(result_data)
        })
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------- END API : /produce_quantity_by_line_days -------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

}

module.exports = cartPendingSessionsDao;
