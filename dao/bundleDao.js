const {baseModelDao} = require('./baseModalDao');
var moment = require('moment');

class BundleDao extends baseModelDao {
    constructor() {
        super('bundles', 'bundle_id');
        this.baseModal = 'bundles';
        this.primaryKey = 'bundle_id';
    }
    findBundleById(req, res, next) {
        let _this= this;
        let bundle_id = req.params.bundle_id;
        _this.db['bundles'].findOne( {
            include:[
                {
                    model : _this.db['orders']
                },
                {
                    model : _this.db['printers']
                },
                {
                    model : _this.db['operation_groupes']
                }

            ],
        where :{
            bundle_id:bundle_id
        }})
            .then(bundles => {
                    if(bundles) {
                        res.json({
                            data: bundles,
                            success: true,
                            status: 200
                        })
                    }else{
                        res.json({
                            data: null,
                            success: false,
                            status: 500
                        })
                    }
                }

            ).catch(err =>
            res.status(500).json(err)
        )
    }
    // infoCartPendingOperationAction(req, res, next) {
    //     let _this= this;
    //     let operation_id = req.params.operation_id;
    //     _this.db['operations'].findOne({
    //         where: {
    //             operation_id: operation_id
    //         }
    //     }).then(operations => {
    //         if (operations) {
    //             _this.db['cart_pending_operations'].findAll({
    //                 where :{
    //                     operation_id: operations.operation_id,
    //                 }
    //             }).then(cart_pending_operations => {
    //                 if (cart_pending_operations) {
    //                     _this.get_sessions_for_cpo(cart_pending_operations).then(resultCPO =>  {
    //
    //                         console.log('resultCPO', resultCPO)
    //                         res.json({
    //                             success: true,
    //                             data: {
    //                                 operations: operations,
    //                                 cart_pending_operations: cart_pending_operations,
    //                             },
    //                             messages: [{
    //                                 userMessage: "Bundle info with success",
    //                                 internalMessage: 'Bundle info with success',
    //                                 code: 5001,
    //                                 more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5001"
    //                             }],
    //                             attributes: [],
    //                             status: 200
    //                         });
    //                     })
    //
    //                 }
    //                 else {
    //                     res.json({
    //                         success: false,
    //                         data:  null,
    //                         // messages: [{
    //                         //     userMessage: "Bundle info with success",
    //                         //     internalMessage: 'Bundle info with success',
    //                         //     code: 5001,
    //                         //     more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5001"
    //                         // }],
    //                         attributes: [],
    //                         status: 500
    //                     });
    //                     return;
    //                 }
    //             });
    //             return;
    //
    //         }
    //         else{
    //             res.json({
    //                 success: false,
    //                 data: null,
    //                 messages: [{
    //                     userMessage: "Bundle Cart not exists",
    //                     internalMessage: 'Bundle Cart not exists',
    //                     code: 1021,
    //                     more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1021"
    //                 }],
    //                 attributes: [],
    //                 status: 500
    //             });
    //             return;
    //         }
    //     })
    // }

    infoCartPendingOperationAction(req, res, next) {
        let db = require('../models');
        let  operation_id = req.params.operation_id;
        let sql = 'select v.*, emp.emp_name, op.bundle_id, op.line_id, op.label as operation_label, b.code_bundle, b.order_id, o.code as order_code, o.label as order_label, o.article_id, o.description as code_description from views_cps_data as v \n' +
            'LEFT JOIN cart_pending_operations as cpo on v.cart_pendingoperation_id = cpo.cart_pending_operation_id\n' +
            'LEFT JOIN operations as op on op.operation_id = cpo.operation_id\n' +
            'LEFT JOIN bundles as b on b.bundle_id = op.bundle_id\n' +
            'LEFT JOIN employees as emp on emp.emp_id = v.employee_id\n'+
            'LEFT JOIN orders as o on b.order_id = o.order_id\n' +
            'where op.operation_id =' + operation_id

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })

    }
    get_sessions_for_cpo(all_cpo) {
        let _this = this
        let cpo_sessions = []
        console.log('get_sessions_for_cpo')
        return new Promise(function(resolve, reject) {
            var i = 0;
            if (all_cpo.length === 0) {
                resolve(true)
            }
            all_cpo.forEach(function (item_cpo) {
                console.log('iii', i)
                _this.get_sessions_for_item_cpo(all_cpo[i]).then(function (save_item_cpo) {
                    cpo_sessions.push(save_item_cpo);
                    console.log('i', i)
                    if (cpo_sessions.length -1 ===  i) {
                        resolve(true)
                    }
                    i++;
                })
            })

        })
    }

    get_sessions_for_item_cpo(item_cpo) {
        let _this = this
        return new Promise(function(resolve, reject) {
            _this.db['cart_pending_sessions'].findAll({

                include:[
                    {
                        model: _this.db['usersessions'],
                        include:[
                            {
                                model: _this.db['employees']
                            }]
                    }
                ],
                where :{
                    cart_pendingoperation_id: item_cpo.cart_pending_operation_id,
                    active : 'Y'
                }
            }).then( cpo_item_cps => {
                item_cpo.cps = cpo_item_cps
                resolve(item_cpo);
            });
        })

    }

    infoBundleByIDAction(req, res, next) {
         let bundle_id = req.params.bundle_id;
                this.db['bundles'].findOne({
                    where: {
                        bundle_id: bundle_id
                    },
                    include: [
                        {
                            model: this.db['orders'],
                            include :[
                                {model: this.db['clients']}
                            ]
                        },
                        {
                            model: this.db['operation_groupes']
                        }
                    ]
                }).then(bundle => {
                    if (bundle) {
                        this.db['operations'].findAll({
                            where :{
                                bundle_id: bundle.bundle_id,
                            }
                        }).then(operations => {
                            if (operations) {
                                this.db['cart_pending_operations'].findAll({
                                    where :{
                                        bundle_id: bundle.bundle_id,
                                    }
                                }).then(cart_pending_operations => {
                                    res.json({
                                        success: true,
                                        data: bundle, operations, cart_pending_operations,
                                        messages: [{
                                            userMessage: "Bundle info with success",
                                            internalMessage: 'Bundle info with success',
                                            code: 5001,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5001"
                                        }],
                                        attributes: [],
                                        status: 200
                                    });
                                })
                            }
                        })
                    }
                    else{
                        res.json({
                            success: false,
                            data: null,
                            messages: [{
                                userMessage: "Bundle Cart not exists",
                                internalMessage: 'Bundle Cart not exists',
                                code: 1021,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1021"
                            }],
                            attributes: [],
                            status: 500
                        });
                    }

                })



    }


    infoBundleAction(req, res, next) {
        let rfid_cart_bundle = req.query.cart_rfid;

        console.log('fffffff')
        if (rfid_cart_bundle === null || rfid_cart_bundle === '') {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Invalid cart Bundle data',
                        internalMessage: 'Invalid cart Bundle data',
                        code: 1011,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1011"
                    }
                ]
            });
            return;
        }else {
            rfid_cart_bundle = rfid_cart_bundle.substr(0, 10);
        }


        let sqlBundle = "SELECT max(cart_id) FROM carts WHERE rfid_cart = '" + rfid_cart_bundle + "'";

                // 1. last bundle
                this.db.sequelize.query(sqlBundle, {
                        type: this.db.sequelize.QueryTypes.SELECT
                    })
                    .then(cart_id => {
                        this.db['carts'].findOne({
                            where: {
                                cart_id: cart_id[0].max,
                                active: 'Y'
                            }
                        }).then(cart => {

                            if (cart) {
                                this.db['bundle_carts'].findOne({
                                    where: {
                                        cart_id: cart.cart_id
                                    },
                                    include: [
                                        {
                                            model: this.db['bundles'],
                                            include: [
                                                {
                                                    model: this.db['orders'],
                                                    include: [
                                                        {model: this.db['clients']}
                                                    ]
                                                },
                
                                            ]
                                        }
                                    ]
                                }).then(bundleCart => {
                                    if (bundleCart) {
                                        this.db['operations'].findAll({
                                            where: {
                                                bundle_id: bundleCart.bundle_id,
                                                active: 'Y'
                                            }
                                        }).then(operations => {
                                            if (operations) {
                                                this.db['cart_pending_operations'].findAll({
                                                    where: {
                                                        bundle_id: bundleCart.bundle_id,
                                                        active: 'Y'
                                                    }
                                                }).then(cart_pending_operations => {
                                                    res.json({
                                                        success: true,
                                                        data: bundleCart, operations, cart_pending_operations,
                                                        messages: [{
                                                            userMessage: "Bundle info with success",
                                                            internalMessage: 'Bundle info with success',
                                                            code: 5001,
                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5001"
                                                        }],
                                                        attributes: [],
                                                        status: 200
                                                    });
                                                })
                                            }
                                        })
                                    } else {
                                        res.json({
                                            success: false,
                                            data: null,
                                            messages: [{
                                                userMessage: "Bundle Cart not exists",
                                                internalMessage: 'Bundle Cart not exists',
                                                code: 1021,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1021"
                                            }],
                                            attributes: [],
                                            status: 500
                                        });
                                    }
                
                                })
                
                            } else {
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: "Bundle Cart not exists",
                                        internalMessage: 'Bundle Cart not exists',
                                        code: 1021,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1021"
                                    }],
                                    attributes: [],
                                    status: 500
                                })
                            }
                        })

                    });
    }


    generate_cpo(operations, returned_bundles, bundle_item) {
        let _this = this
        return new Promise(function(resolve, reject) {
            let i = 0
            operations.forEach(operation => {
                let pending_carts = {};
                pending_carts.operation_id = operation.operation_id;
                pending_carts.finished = 0;
                pending_carts.bundle_id = bundle_item.bundle_id;
                pending_carts.datereadbundle = Math.round(+new Date()/1000);
                pending_carts.machine_type_id = operation.machine_type_id;
                pending_carts.quantity = 0;
                var modalObj = _this.db['cart_pending_operations'].build(pending_carts);
                modalObj.save().then(result => {

                });


                if (i ===operations.length -1 ) {

                    resolve(returned_bundles[0])
                }
                i++
            })
        })
    }

    generateOpeationToBundles(bundles) {
        let _this = this
        return new Promise(function (resolve, reject) {

            let i = 0
            bundles.forEach(bundle_item => {
                _this.db['operations'].findAll({
                    where: {
                        bundle_id: bundle_item.bundle_id,
                        // machine_type_id: userSession.box.machine.machine_type_id
                    }
                }).then(operations => {

                    _this.generate_cpo(operations, bundles, bundle_item).then(cpo_generated => {

                    })
                })
                if (i === bundles.length -1) {
                    resolve(bundles)
                }
                i++
            })
        })
    }

    saveBundles(req, res, next) {
        var order = req.body.order;
        var bundles = req.body.bundles;
        let _this = this
        let db = this.db;

        if (order && order.code != null) {

            db['orders'].build(order).save().then(resultOrder => {

                var bundleResult = [];

                this.db['orders'].findOne({
                    where: {
                        order_id: resultOrder.order_id,
                        active : 'Y'
                    },
                    include: [
                        {
                            model: this.db['articles'],
                        },
                        {
                            model: this.db['clients'],
                        }
                    ]
                }).then(order => {


                    _this.generate_bundles(bundles, order).then(returned_bundles=> {


                        _this.generateOpeationToBundles(bundles).then(bundle_result => {
                            res.json({
                                success: true,
                                data: {
                                    order: order,
                                    bundles: bundle_result[0]
                                },
                                messages: [{
                                    userMessage: "Bundles created",
                                    internalMessage: 'Bundles created',
                                    code: 5002,
                                }],
                                attributes: [],
                                status: 200
                            });
                        })

                    })

                    let async = require('async');
                    // var  promise = new Promise(function (resolve, reject) {
                    //     _this.generate_bundles(bundles, order).then(function(returned_bundles) {
                    //         setTimeout(resolve, 100, returned_bundles);
                    //
                    //     })
                    // })
                    //
                    // Promise.all([promise]).then(function (returned_bundles) {
                    //
                    //
                    //     var promise2 = new Promise(function (resolve, reject) {
                    //
                    //
                    //         returned_bundles[0].forEach(bundle_item => {
                    //             _this.db['operations'].findAll({
                    //                 where: {
                    //                     bundle_id: bundle_item.bundle_id,
                    //                     // machine_type_id: userSession.box.machine.machine_type_id
                    //                 }
                    //             }).then(operations => {
                    //
                    //                 _this.generate_cpo(operations, returned_bundles, bundle_item).then(cpo_generated=> {
                    //
                    //                 })
                    //
                    //                 // if (operations && operations.length > 0) {
                    //                 //     let i = 0
                    //                 //     var promise2 = new Promise(function (resolve, reject) {
                    //                 //         operations.forEach(operation => {
                    //                 //             let pending_carts = {};
                    //                 //             pending_carts.operation_id = operation.operation_id;
                    //                 //             pending_carts.finished = 0;
                    //                 //             pending_carts.bundle_id = bundle_item.bundle_id;
                    //                 //             pending_carts.datereadbundle = Math.round(+new Date()/1000);
                    //                 //             pending_carts.machine_type_id = operation.machine_type_id;
                    //                 //             pending_carts.quantity = 0;
                    //                 //             var modalObj = _this.db['cart_pending_operations'].build(pending_carts);
                    //                 //             modalObj.save().then(result => {
                    //                 //
                    //                 //             });
                    //                 //
                    //                 //
                    //                 //             if (i ===operations.length -1 ) {
                    //                 //
                    //                 //                 console.log('iiiiiiiiiiiiiiii', operation.length)
                    //                 //                 setTimeout(resolve, 1000, returned_bundles[0]);
                    //                 //             }
                    //                 //             i++
                    //                 //         })
                    //                 //
                    //                 //     })
                    //                 //
                    //                 //
                    //                 //
                    //                 // }
                    //                 setTimeout(resolve, 5000, returned_bundles[0]);
                    //             })
                    //
                    //         })
                    //
                    //     })
                    //
                    //    Promise.all([promise2]).then(function (returned_bundles) {
                    //         res.json({
                    //             success: true,
                    //             data: {
                    //                 order: order,
                    //                 bundles: returned_bundles[0]
                    //             },
                    //             messages: [{
                    //                 userMessage: "Bundles created",
                    //                 internalMessage: 'Bundles created',
                    //                 code: 5002,
                    //             }],
                    //             attributes: [],
                    //             status: 200
                    //         });
                    //    })
                    //
                    // })



                })
            })

        } else {

            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Bundles not created",
                    internalMessage: 'Bundles not created',
                    code: 5003,
                }],
                attributes: [],
                status: 500
            });
        }

    }

    generate_bundles(bundles, order) {
        let db = this.db;
        let _this = this;
        let bundles_generated = []
        let i = 0;
        return new Promise(function(resolve, reject) {
            bundles.sequences = []
            bundles.forEach(function (itemBundle) {
                itemBundle.order_id = order.order_id;
                itemBundle.created_at = moment().format();
                _this.generate_item_bundle(itemBundle, order, i).then(function (bundle_new_data) {
                    bundles_generated.push(bundle_new_data)
                    if (bundles_generated.length === bundles.length) {
                        console.log('resolveeeeee length ', bundles.length)
                        resolve(bundles_generated)
                    }
                })
                i++;
            })
        })
    }

     generate_item_bundle (bundle_data, order, i) {
        let db = this.db;
        let _this = this;
        return new Promise(function(resolve, reject) {

            bundle_data.num_bundle = order.code+'/'+bundle_data.code_bundle
            bundle_data.code_bundle = order.code+'/'+bundle_data.code_bundle
            db['bundles'].build(bundle_data).save().then(savedBundle => {
                bundle_data.bundle_id = savedBundle.bundle_id;

                _this.db['printers'].findOne({
                    where : {
                        printer_id: bundle_data.printer_id,
                    active: 'Y'}
                }).then(printer => {

                    bundle_data.printer = printer;
                    _this.generate_operation_from_templates(bundle_data).then(function (bundle_new_data) {
                        resolve(bundle_new_data)
                    })
                })


            });
        })
    }

    generateline(line_id) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            _this.db['lines'].findOne({
                where : {
                    line_id :line_id,
                    active: 'Y'
                }
            }).then(line => {
                resolve(line)
            })
        })
    }

    generate_operation_from_templates(bundle) {
        let db = this.db;
        let _this = this;
        return new Promise(function(resolve, reject) {
            bundle.operation_groups.forEach(function(operationGroup, indexGroup){
                // save operation
                let operationGroupSource = operationGroup;
                bundle.operation_groups[indexGroup].operationsTemplate = []

                bundle.operation_groups[indexGroup].line = {}

                _this.generateline(operationGroupSource.line_id).then(line => {
                    bundle.operation_groups[indexGroup].line = line;


                var i = 0;
                operationGroupSource.operations.forEach(function(operationTemplate_id, index){
                    db['operation_templates'].findOne({
                        where: {
                            operation_template_id: operationTemplate_id,
                            active : 'Y'
                        }
                    }).then(operationTemplate => {
                        _this.generate_operation_from_template(bundle, operationTemplate, operationGroupSource).then(generated_operation => {

                            console.log('generated_operationnnnnn', generated_operation === null)
                            // if (generated_operation === null) {
                                bundle.operation_groups[indexGroup].operationsTemplate.push(generated_operation)
                            // }



                                _this.db['sequences'].findAll({
                                    where : {
                                        operation_template_id : operationTemplate_id,
                                        active: 'Y'
                                    }
                                }).then(sequences => {

                                    if (sequences) {

                                        _this.generate_sequence_operations(sequences, generated_operation, operationTemplate_id).then(sequence_generated => {



                                            if (bundle.operation_groups[indexGroup].operationsTemplate.length === operationGroupSource.operations.length) {
                                                resolve(bundle)
                                            }


                                        })

                                    }

                                })
                        })
                    })
                    i++;
                })
                })

            })
        })
    }

    generate_sequence_operations(sequences, operation, operationTemplate_id) {
        let _this = this
        let i = 0
        return new Promise(function(resolve, reject) {

            if (sequences.length === 0) {
                resolve(sequences)
            }

            sequences.forEach(function(sequence) {

                _this.db['sequence_operations'].build({
                    operation_id: operation.operation_id,
                    stitchcount: sequence.stitchcount,
                    coupe_fil: sequence.coupe_fil,
                    parent_sequence: sequence.parent_sequence,
                    back_stitch: sequence.back_stitch,
                    sequence_order: sequence.sequence_order,
                    picture_id: sequence.picture_id,
                    operation_template_id: operationTemplate_id,
                    back_stich_positive_tolerence: sequence.back_stich_positive_tolerence,
                    back_stich_negative_tolerence: sequence.back_stich_negative_tolerence,
                    stitchcount_positive_tolerence: sequence.stitchcount_positive_tolerence,
                    stitchcount_negative_tolerence: sequence.stitchcount_negative_tolerence,
                    with_subsequences: sequence.with_subsequences,
                    description: sequence.description,
                    active: 'Y'
                }).save().then(result1 => {


                })

                if (i === sequences.length -1 ) {
                    resolve(sequences)
                }

                i++
            })
        })
    }

    generate_operation_from_template (bundle, operationTemplate, operationGroupSource) {
        let db = this.db;
        let _this = this;
        return new Promise(function(resolve, reject) {

            if (operationTemplate && bundle) {
                db['operations'].build({
                    line_id: operationGroupSource.line_id,
                    active: 'Y',
                    description: operationTemplate.description,
                    label: operationTemplate.label,
                    op_code: operationTemplate.op_code,
                    machine_type_id: operationTemplate.machine_type_id,
                    accminprice: operationTemplate.accminprice,
                    time: operationTemplate.time,
                    bundle_id: bundle.bundle_id,
                    quantity: bundle.bundle_qte
                }).save().then( generated_operation => {
                    resolve(generated_operation)
                });
            } else {
                resolve(null)
            }

        })
    }

    infoBundleByID(req, res, next) {
        let bundle_id = req.query.bundle_id;

        if (bundle_id === null || bundle_id === '') {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Invalid Bundle data',
                        internalMessage: 'Invalid Bundle data'
                    }
                ]
            });
            return;
        }
                        this.db['bundles'].findOne({
                            where: {
                                bundle_id: bundle_id
                            },
                            include: [
                                {
                                    model: this.db['orders'],
                                    include: [
                                        {model: this.db['clients']}
                                    ]
                                },
                            ]
                        }).then(bundleCart => {
                            if (bundleCart) {
                                this.db['operations'].findAll({
                                    where: {
                                        bundle_id: bundleCart.bundle_id,
                                        active: 'Y'
                                    }
                                }).then(operations => {
                                    if (operations) {
                                        this.db['cart_pending_operations'].findAll({
                                            where: {
                                                bundle_id: bundleCart.bundle_id,
                                                active: 'Y'
                                            }
                                        }).then(cart_pending_operations => {
                                            res.json({
                                                success: true,
                                                data: bundleCart, operations, cart_pending_operations,
                                                messages: [{
                                                    userMessage: "Bundle info with success",
                                                    internalMessage: 'Bundle info with success',
                                                    code: 5001,
                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5001"
                                                }],
                                                attributes: [],
                                                status: 200
                                            });
                                        })
                                    }
                                })
                            } else {
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: "Bundle Cart not exists",
                                        internalMessage: 'Bundle Cart not exists',
                                        code: 1021,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1021"
                                    }],
                                    attributes: [],
                                    status: 500
                                });
                            }

                        })


    }

    codeBundles(req ,res, next) {
        let _this = this
        var promise1= new Promise(function (resolve, reject) {
            let sql = 'select distinct(code_bundle) \n' +
                'from bundles \n' +
                'where active = \'Y\' \n'+
                'order by code_bundle asc';
            _this.db.sequelize.query(sql, {
                type: _this.db.sequelize.QueryTypes.SELECT
            }).then(codebundles => {
                let i = 0
                let data = []
                if (codebundles ) {
                    codebundles.forEach(bundle => {
                        data.push(bundle.code_bundle)
                        if (data.length === codebundles.length) {
                            resolve(data)
                        }
                    })
                } else {
                    resolve([])
                }
            })
        })
        Promise.all([promise1]).then(function (dataResult) {
            res.send({data : dataResult[0]})
        })
    }


}

module.exports = BundleDao;
