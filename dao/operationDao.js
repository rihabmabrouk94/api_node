const {
    baseModelDao
} = require('./baseModalDao');
var sequelize = require('sequelize');
class OperationDao extends baseModelDao {
    constructor() {
        super('operations', 'operation_id');
        this.baseModal = 'operations';
        this.primaryKey = 'operation_id';
    }

    /*
    @Get("/api/operationsListt" , name="operations_list_api")
     */

    async saveOp(operations, bundleCart, userSession) {
        await operations.forEach(function (operation) {
            var db = require('../models');
            db['cart_pending_operations'].findOne({
                where: {
                    bundle_id: bundleCart.bundle_id,
                    operation_id: operation.operation_id,
                    finished: 0
                }
            }).then(checkPendingOperation => {

                if (checkPendingOperation === null) {
                    let pending_carts = {};
                    pending_carts.operation_id = operation.operation_id;
                    pending_carts.finished = 0;
                    pending_carts.bundle_id = bundleCart.bundle_id;
                    pending_carts.datereadbundle = Date.now();
                    pending_carts.machine_id = userSession.box.machine.machine_id;

                    pending_carts.quality = 0;
                    var modalObj = db['cart_pending_operations'].build(pending_carts);

                    modalObj.save()
                        .then(result => {});
                }
            });
        })
    }

    // getOperationsListOldAction(req, res, next) {
    //     //let addr = req.query.source_addr;

    //     var db = require('../models');

    //     let rfid_cart_bundle = req.query.cart_rfid;

    //     let session_id = req.query.usersession_id;

    //     if (rfid_cart_bundle == null || rfid_cart_bundle == '') {
    //         res.send({
    //             success: false,
    //             data: null,
    //             messages: [{
    //                 userMessage: 'Invalid RFID data',
    //                 internalMessage: 'Invalid RFID data',
    //                 code: 1001
    //             }]
    //         });
    //         return;
    //     } else {
    //         rfid_cart_bundle = rfid_cart_bundle.substr(0, 10);
    //     }

    //     if (session_id == null || session_id == '') {
    //         res.send({
    //             success: false,
    //             data: null,
    //             messages: [{
    //                 userMessage: 'Invalid user session data',
    //                 internalMessage: 'Invalid user session data',
    //                 code: 1006
    //             }]
    //         });
    //         return;
    //     }


    //     // 1 - Valider la session
    //     db['usersessions'].findOne({
    //         where: {
    //             usersession_id: session_id,
    //             time_out: null
    //         },
    //         include: [{
    //             model: db['boxes'],
    //             include: [{
    //                 model: db['machines'],
    //                 include: [{
    //                     model: db['machine_types']
    //                 }]
    //             }]
    //         }]
    //     }).then(userSession => {


    //         if (userSession) {

    //             // 2 - Valider la carte

    //             let sqlBundle = "SELECT max(cart_id) FROM carts WHERE rfid_cart = '" + rfid_cart_bundle + "'";

    //             // 1. last bundleMaintenanceTaskController
    //             db.sequelize.query(sqlBundle, {
    //                     type: db.sequelize.QueryTypes.SELECT
    //                 })
    //                 .then(cart_id => {

    //                     db['carts'].findOne({
    //                         where: {
    //                             cart_id: cart_id[0].max
    //                         }
    //                     }).then(cart => {

    //                         if (cart) {

    //                             db['bundle_carts'].findOne({
    //                                 where: {
    //                                     cart_id: cart.cart_id
    //                                 },
    //                                 include: [{
    //                                     model: db['bundles'],
    //                                     include: [{
    //                                         model: db['orders']
    //                                     }]
    //                                 }]
    //                             }).then(bundleCart => {

    //                                 if (bundleCart) {




    //                                     // 3 - Chercher Cart-pending-Operations qui sont liées au bundle et au même type du machine

    //                                     db['operations'].findAll({
    //                                         where: {
    //                                             bundle_id: bundleCart.bundle_id,
    //                                             machine_type_id: userSession.box.machine.machine_type_id
    //                                         }
    //                                     }).then(operations => {

    //                                         console.log('operations', operations.length)

    //                                         console.log('machine type _id',  userSession.box.machine.machine_type_id)

    //                                         if (operations && operations.length > 0) {

    //                                             let async = require('async');


    //                                             // 1 *********************************************************************************************************

    //                                             db['cart_pending_operations'].findAll({
    //                                                 where: {
    //                                                     //  finished: 1,
    //                                                     bundle_id: bundleCart.bundle_id,
    //                                                     '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                 },
    //                                                 include: [{
    //                                                         model: db['operations']
    //                                                     },
    //                                                     {
    //                                                         model: db['bundles'],
    //                                                         include: [{
    //                                                             model: db['orders']
    //                                                         }]
    //                                                     }
    //                                                 ],
    //                                                 order : [
    //                                                     ['cart_pending_operation_id', 'DESC']]
    //                                             }).then(cartPendingOperations => {


    //                                                 if (cartPendingOperations.length === 0) {

    //                                                     let _this = this

    //                                                     _this.saveCPO(operations, bundleCart.bundle_id, userSession.box.machine.machine_id).then(savedCpo => {

    //                                                         db['cart_pending_operations'].findAll({
    //                                                             where: {
    //                                                                 //  finished: 1,
    //                                                                 bundle_id: bundleCart.bundle_id,
    //                                                                 '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                             },
    //                                                             include: [{
    //                                                                     model: db['operations']
    //                                                                 },
    //                                                                 {
    //                                                                     model: db['bundles'],
    //                                                                     include: [{
    //                                                                         model: db['orders']
    //                                                                     }]
    //                                                                 }
    //                                                             ],
    //                                                             order : [
    //                                                                 ['cart_pending_operation_id', 'DESC']]
    //                                                         }).then(cartPendingOperations => {

    //                                                             _this.generateSequenceOperation(cartPendingOperations).then(c => {


    //                                                                 res.send({
    //                                                                     success: true,
    //                                                                     data: c,
    //                                                                     status: 200
    //                                                                 });
    //                                                                 return;
    //                                                             })
    //                                                         })



    //                                                     });

    //                                                 } else {

    //                                                     db['cart_pending_operations'].findAll({
    //                                                         where: {
    //                                                             finished: 0,
    //                                                             bundle_id: bundleCart.bundle_id,
    //                                                             '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                         },
    //                                                         include: [{
    //                                                                 model: db['operations']
    //                                                             },
    //                                                             {
    //                                                                 model: db['bundles'],
    //                                                                 include: [{
    //                                                                     model: db['orders']
    //                                                                 }]
    //                                                             }
    //                                                         ],
    //                                                         order : [
    //                                                             ['cart_pending_operation_id', 'DESC']]
    //                                                     }).then(cartPendingOperations => {

    //                                                         this.generateSequenceOperation(cartPendingOperations).then(c => {
    //                                                             res.send({
    //                                                                 success: true,
    //                                                                 data: c,
    //                                                                 status: 200
    //                                                             });
    //                                                             return;
    //                                                         })

    //                                                     })


    //                                                 }
    //                                             });

    //                                         } else {
    //                                             res.send({
    //                                                 success: false,
    //                                                 data: null,
    //                                                 messages: [{
    //                                                     userMessage: 'The bundle does not contain operations',
    //                                                     internalMessage: 'The bundle does not contain operations',
    //                                                     code: 4002
    //                                                 }]
    //                                             });
    //                                             return;
    //                                         }

    //                                     });


    //                                 } else {

    //                                     res.send({
    //                                         success: false,
    //                                         data: null,
    //                                         messages: [{
    //                                             userMessage: 'Invalid cart Bundle data',
    //                                             internalMessage: 'Invalid cart Bundle data',
    //                                             code: 1011
    //                                         }]
    //                                     });
    //                                     return;

    //                                 }

    //                             })


    //                         } else {
    //                             res.send({
    //                                 success: false,
    //                                 data: null,
    //                                 messages: [{
    //                                     userMessage: 'Invalid cart data',
    //                                     internalMessage: 'Invalid cart data',
    //                                     code: 1016
    //                                 }]
    //                             });
    //                             return;
    //                         }

    //                     });
    //                 })



    //         } else {

    //             res.send({
    //                 success: false,
    //                 data: null,
    //                 messages: [{
    //                     userMessage: 'User session does not exists',
    //                     internalMessage: 'User session does not exists',
    //                     code: 1008
    //                 }]
    //             });
    //             return;
    //         }
    //     })

    // }

    saveCPO(operations, bundle_id, machine_id) {
        let _this = this;
        let i = 0;
        let cpoSaved = 0;

        return new Promise(function (resolve, reject) {
            if (!operations || operations.length === 0) {
                resolve('ok');
                return;
            }
            operations.forEach(function (operation) {
                _this.db['cart_pending_operations'].findOne({
                    where: {
                        bundle_id: bundle_id,
                        operation_id: operation.operation_id,
                        finished: 0
                    }
                }).then(checkPendingOperation => {

                    console.log('check cpo', checkPendingOperation)

                    if (checkPendingOperation === null) {

                        let pending_carts = {};
                        pending_carts.operation_id = operation.operation_id;
                        pending_carts.finished = 0;
                        pending_carts.bundle_id = bundle_id;
                        pending_carts.datereadbundle = Date.now();
                        pending_carts.machine_id = machine_id;
                        pending_carts.quantity = 0;
                        var modalObj = _this.db['cart_pending_operations'].build(pending_carts);
                        modalObj.save().then(result => {
                            cpoSaved++;
                            if (cpoSaved >= operations.length) {
                                resolve('ok')
                            }
                        });
                    } else {
                        cpoSaved++;
                        if (cpoSaved >= operations.length) {
                            resolve('ok')
                        }
                    }
                });
                i++;
            });
        })
    }

    resetBundle(req, res, next) {
        let bundle_id = req.query.bundle_id
        let _this = this;
        _this.db['operations'].findAll({
            where: {
                bundle_id: bundle_id
            },
            include : [
                {
                    model: _this.db['bundles']
                }
            ]
        }).then(operations => {

            if (operations && operations.length > 0) {

                _this.db['operations'].findAll({
                    where: {
                        bundle_id: bundle_id
                    },
                    include : [
                        {
                            model : _this.db['bundles']
                        }
                    ]
                }).then(operations => {

                    _this.deleteSequenceOperation(operations).then(sequence_operation_deleted => {

                        _this.db['cart_pending_operations'].findAll({
                            where: {
                                bundle_id: bundle_id,
                            }
                        }).then(cartPendingOperations => {

                            _this.deleteCPO(cartPendingOperations).then(deletedCpo => {

                                _this.updateOperations(operations).then(operations_updated => {

                                    res.send({
                                        success : true,
                                        messages: 'This bundle is deleted',
                                    })
                                })



                            })
                        })
                    })
                })

            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: 'The bundle does not contain operations',
                        internalMessage: 'The bundle does not contain operations',
                        code: 4002
                    }]
                });
                return;
            }
        })
    }

    // getOperationsListOldAction(req, res, next) {
    //     //let addr = req.query.source_addr;
    //     let _this = this
    //     var db = require('../models');
    
    //     let rfid_cart_bundle = req.query.cart_rfid;
    
    //     let session_id = req.query.usersession_id;
    
    //     if (rfid_cart_bundle == null || rfid_cart_bundle == '') {
    //         res.send({
    //             success: false,
    //             data: null,
    //             messages: [{
    //                 userMessage: 'Invalid RFID data',
    //                 internalMessage: 'Invalid RFID data',
    //                 code: 1001
    //             }]
    //         });
    //         return;
    //     } else {
    //         rfid_cart_bundle = rfid_cart_bundle.substr(0, 10);
    //     }
    //     if (session_id == null || session_id == '') {
    //         res.send({
    //             success: false,
    //             data: null,
    //             messages: [{
    //                 userMessage: 'Invalid user session data',
    //                 internalMessage: 'Invalid user session data',
    //                 code: 1006
    //             }]
    //         });
    //         return;
    //     }
    //     db['usersessions'].findOne({
    //         where: {
    //             usersession_id: session_id,
    //             time_out: null
    //         },
    //         include: [{
    //             model: db['boxes'],
    //             include: [{
    //                 model: db['machines'],
    //                 include: [{
    //                     model: db['machine_types']
    //                 }]
    //             }]
    //         }]
    //     }).then(userSession => {
    
    
    //         if (userSession) {
    //             // 2 - Valider la carte
    
    //             let sqlBundle = "SELECT max(cart_id) FROM carts WHERE rfid_cart = '" + rfid_cart_bundle + "'";
    
    //             // 1. last bundleMaintenanceTaskController
    //             db.sequelize.query(sqlBundle, {
    //                 type: db.sequelize.QueryTypes.SELECT
    //             })
    //                 .then(cart_id => {
    
    //                     db['carts'].findOne({
    //                         where: {
    //                             cart_id: cart_id[0].max
    //                         }
    //                     }).then(cart => {
    
    //                         if (cart) {
    //                             db['bundle_carts'].findOne({
    //                                 where: {
    //                                     cart_id: cart.cart_id
    //                                 },
    //                                 include: [{
    //                                     model: db['bundles'],
    //                                     include: [{
    //                                         model: db['orders']
    //                                     }]
    //                                 }]
    //                             }).then(bundleCart => {
    
    //                                 if (bundleCart) {
    
    //                                     db['machine_operation_templates'].findAll({
    //                                         where: {
    //                                             machine_id: userSession.box.machine.machine_id
    //                                         },
    //                                         include: [
    //                                             {
    //                                                 model: _this.db['operation_templates']
    //                                             },
    //                                             {
    //                                                 model: _this.db['machines']
    //                                             }
    //                                         ]
    //                                     }).then(machine_operation_templates => {
    
    //                                         console.log('machine_operation_templates', machine_operation_templates.length)
    
    //                                         console.log('machine_id', userSession.box.machine.machine_id)
    
    //                                         if (machine_operation_templates && machine_operation_templates.length > 0) {
                                                
    //                                                       var promise1 = new Promise(function (resolve, reject) {
        
    //                                                           var cpo_result = []
    //                                                           machine_operation_templates.forEach(machine_operation_template_item => {
        
    //                                                               _this.db['cart_pending_operations'].findAll({
    //                                                                   where: {
    //                                                                       '$operation.machine_type_id$': userSession.box.machine.machine_type_id,
    //                                                                       finished: 0,
    //                                                                       active: 'Y',
    //                                                                       '$operation.op_code$': machine_operation_template_item.operation_template.op_code
    //                                                                   },
    //                                                                   include: [
    //                                                                       {
    //                                                                           model: _this.db['operations'],
        
    //                                                                       },
    //                                                                       {
    //                                                                           model: _this.db['bundles'],
    //                                                                           include: [{
    //                                                                               model: _this.db['orders']
    //                                                                           }]
    //                                                                       }
        
    //                                                                   ],
    //                                                                   order: [
    //                                                                       ['bundle_id', 'ASC']
    //                                                                   ]
    //                                                               }).then(cartPendingOperations => {


        
        
    //                                                                   var promise2 = new Promise(function (resolve, reject) {
    //                                                                       cartPendingOperations.forEach(cpo_item => {
        
    //                                                                               cpo_result.push(cpo_item)
        
    //                                                                           setTimeout(resolve, 100, cpo_result);
        
    //                                                                       })
    //                                                                   })
    //                                                                   })
        
    //                                                               setTimeout(resolve, 100, cpo_result);
    //                                                           })
        
    //                                                       })
        
    //                                                         Promise.all([promise1]).then(function (cpo_result) {
    //                                                             _this.generateSequenceOperation(cpo_result[0]).then(c => {
    //                                                                 res.send({
    //                                                                     success: true,
    //                                                                     data: c,
    //                                                                     status: 200
    //                                                                 });
    //                                                             })
    //                                                         })
    //                                         }
    //                                         else {
    //                                             // 3 - Chercher Cart-pending-Operations qui sont liées au bundle et au même type du machine
    
    
    //                                             db['operations'].findAll({
    //                                                 where: {
    //                                                     bundle_id: bundleCart.bundle_id,
    //                                                     machine_type_id: userSession.box.machine.machine_type_id
    //                                                 }
    //                                             }).then(operations => {
    
    //                                                 console.log('operations', operations.length)
    
    //                                                 console.log('machine type _id', userSession.box.machine.machine_type_id)
    
    //                                                 if (operations && operations.length > 0) {
    
    //                                                     let async = require('async');
    
    
    //                                                     // 1 *********************************************************************************************************
    
    //                                                     db['cart_pending_operations'].findAll({
    //                                                         where: {
    //                                                             //  finished: 1,
    //                                                             bundle_id: bundleCart.bundle_id,
    //                                                             '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                         },
    //                                                         include: [{
    //                                                             model: db['operations']
    //                                                         },
    //                                                         {
    //                                                             model: db['bundles'],
    //                                                             include: [{
    //                                                                 model: db['orders']
    //                                                             }]
    //                                                         }
    //                                                         ],
    //                                                         order: [
    //                                                             ['cart_pending_operation_id', 'DESC']]
    //                                                     }).then(cartPendingOperations => {
    
    
    //                                                         if (cartPendingOperations.length === 0) {
    
    //                                                             let _this = this
    
    //                                                             _this.saveCPO(operations, bundleCart.bundle_id, userSession.box.machine.machine_id).then(savedCpo => {
    
    //                                                                 db['cart_pending_operations'].findAll({
    //                                                                     where: {
    //                                                                         //  finished: 1,
    //                                                                         bundle_id: bundleCart.bundle_id,
    //                                                                         '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                                     },
    //                                                                     include: [{
    //                                                                         model: db['operations']
    //                                                                     },
    //                                                                     {
    //                                                                         model: db['bundles'],
    //                                                                         include: [{
    //                                                                             model: db['orders']
    //                                                                         }]
    //                                                                     }
    //                                                                     ],
    //                                                                     order: [
    //                                                                         ['cart_pending_operation_id', 'DESC']]
    //                                                                 }).then(cartPendingOperations => {
    
    //                                                                     _this.generateSequenceOperation(cartPendingOperations).then(c => {
    
    
    //                                                                         res.send({
    //                                                                             success: true,
    //                                                                             data: c,
    //                                                                             status: 200
    //                                                                         });
    //                                                                         return;
    //                                                                     })
    //                                                                 })
    
    
    
    //                                                             });
    
    //                                                         } else {
    
    //                                                             db['cart_pending_operations'].findAll({
    //                                                                 where: {
    //                                                                     finished: 0,
    //                                                                     bundle_id: bundleCart.bundle_id,
    //                                                                     '$operation.machine_type_id$': userSession.box.machine.machine_type_id
    //                                                                 },
    //                                                                 include: [{
    //                                                                     model: db['operations']
    //                                                                 },
    //                                                                 {
    //                                                                     model: db['bundles'],
    //                                                                     include: [{
    //                                                                         model: db['orders']
    //                                                                     }]
    //                                                                 }
    //                                                                 ],
    //                                                                 order: [
    //                                                                     ['cart_pending_operation_id', 'DESC']]
    //                                                             }).then(cartPendingOperations => {
    
    //                                                                 this.generateSequenceOperation(cartPendingOperations).then(c => {
    //                                                                     res.send({
    //                                                                         success: true,
    //                                                                         data: c,
    //                                                                         status: 200
    //                                                                     });
    //                                                                     return;
    //                                                                 })
    
    //                                                             })
    
    
    //                                                         }
    //                                                     });
    
    //                                                 } else {
    //                                                     res.send({
    //                                                         success: false,
    //                                                         data: null,
    //                                                         messages: [{
    //                                                             userMessage: 'The bundle does not contain operations',
    //                                                             internalMessage: 'The bundle does not contain operations',
    //                                                             code: 4002
    //                                                         }]
    //                                                     });
    //                                                     return;
    //                                                 }
    
    //                                             })
    
    
    
    //                                         }
    //                                     })
    //                                 } else {
    //                                     res.send({
    //                                         success: false,
    //                                         data: null,
    
    
    //                                         messages: [{
    //                                             userMessage: 'Invalid cart Bundle data',
    //                                             internalMessage: 'Invalid cart Bundle data',
    //                                             code: 1011
    //                                         }]
    //                                     });
    //                                     return;
    //                                 }
    //                             })
    //                         }
    //                         else {
    //                             res.send({
    //                                 success: false,
    //                                 data: null,
    //                                 messages: [{
    //                                     userMessage: 'Invalid cart data',
    //                                     internalMessage: 'Invalid cart data',
    //                                     code: 1016
    //                                 }]
    //                             });
    //                             return;
    //                         }
    //                     })
    //                 })
    
    //         } else {
    
    //             res.send({
    //                 success: false,
    //                 data: null,
    //                 messages: [{
    //                     userMessage: 'User session does not exists',
    //                     internalMessage: 'User session does not exists',
    //                     code: 1008
    //                 }]
    //             });
    //             return;
    //         }
    
    //     })
    // }
    updateOperations(operations){
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {

            if (operations.length ===0) {
                resolve(operations)
            }
            operations.forEach(operation => {

                _this.db['operation_templates'].findOne({
                    where : {
                        op_code: operation.op_code
                    }
                }).then(operationTemplate => {
                    if (operationTemplate) {
                        _this.db['operations'].update({
                            description: operationTemplate.description,
                            label: operationTemplate.label,
                            op_code: operationTemplate.op_code,
                            machine_type_id: operationTemplate.machine_type_id,
                            accminprice: operationTemplate.accminprice,
                            time: operationTemplate.time,
                            bundle_id: operation.bundle_id,
                            quantity: operation.bundle.bundle_qte
                        },
                            {
                                where: {
                                    operation_id: operation.operation_id
                                }
                        }
                        ).then(operation_updated => {

                            _this.generateSequence(operationTemplate, operation.operation_id).then(sequence_operation=> {
                                if (i === operations.length -1) {
                                    resolve(operations)
                                }
                                i++
                            })


                        })
                    } else {


                        if (i === operations.length -1) {
                            resolve(operetations)
                        }
                        i++

                    }
                })
            })
        })
    }

    generateSequence(operationTemplate, operation_id) {

        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {

            _this.db['sequences'].findAll({
                where : {
                    operation_template_id : operationTemplate.operation_template_id,
                    active: 'Y'
                }
            }).then(sequences => {

                console.log('sequences', sequences)

                if (sequences && sequences.length> 0) {

                    var saveSequences = new Promise(function (resolve, reject) {

                        sequences.forEach(function(sequence) {

                            _this.db['sequence_operations'].build({
                                operation_id: operation_id,
                                stitchcount: sequence.stitchcount,
                                coupe_fil: sequence.coupe_fil,
                                parent_sequence: sequence.parent_sequence,
                                back_stitch: sequence.back_stitch,
                                sequence_order: sequence.sequence_order,
                                picture_id: sequence.picture_id,
                                operation_template_id: operationTemplate.operation_template_id,
                                back_stich_positive_tolerence: sequence.back_stich_positive_tolerence,
                                back_stich_negative_tolerence: sequence.back_stich_negative_tolerence,
                                stitchcount_positive_tolerence: sequence.stitchcount_positive_tolerence,
                                stitchcount_negative_tolerence: sequence.stitchcount_negative_tolerence,
                                with_subsequences: sequence.with_subsequences,
                                description: sequence.description,
                                active: 'Y'
                            }).save().then(result1 => {

                                console.log('sequnce build', sequences.length , i)

                            })

                            if (i === sequences.length -1 ) {
                                setTimeout(resolve, 100, sequences);

                            }

                            i++
                        })



                    })

                    Promise.all([saveSequences]).then(function (sequences) {
                        resolve(sequences)
                    })

                }
                else {
                    resolve(sequences)
                }

            })
        })

    }

    deleteSequenceOperation(operations) {
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {

            if (operations.length === 0 ) {
                resolve({
                    result : 0,
                    success: true
                })
            }

            operations.forEach(operation => {
                _this.db['sequence_operations'].destroy({
                    where: {
                        operation_id: operation.operation_id
                    }
                }).then(sequence_operations => {

                    resolve({
                        result : 1,
                        success: true
                    })

                })
            })
        })
    }

    deleteCPO (cartPendingOperations) {
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {
            if (cartPendingOperations.length === 0 ) {
                resolve(true)
            }
            cartPendingOperations.forEach(cpo => {
                _this.db['cart_pending_sessions'].destroy({
                    where: {
                        cart_pendingoperation_id: cpo.cart_pending_operation_id
                    }
                }).then(cps_deleted => {

                    _this.db['cart_pending_operations'].destroy({
                        where: {
                            cart_pending_operation_id: cpo.cart_pending_operation_id
                        }
                    }).then(cpo_deleted=> {
                        if (i === cartPendingOperations.length -1 ) {
                            resolve(true);
                            return;
                        }
                        i++
                    })
                })
            })
        })
    }

    generateSequenceOperation(cartPendingOperations) {

        console.log('generateSequenceOperation*****', cartPendingOperations.length)

        let _this = this;
        return new Promise(function (resolve, reject) {
            let i = 0;
            let generatedCpoSequences = 0;

            if (cartPendingOperations.length === 0) {
                resolve([])
                return;
            }
            cartPendingOperations.forEach(function (cartPendingOperation) {
                cartPendingOperation.operation.sequences = []

                _this.findOperationSequence2(cartPendingOperation).then(resultFinOpSeq => {
                    cartPendingOperation.operation.sequences = resultFinOpSeq.operation.sequences;
                    generatedCpoSequences++;
                    if (generatedCpoSequences >= cartPendingOperations.length) {
                        resolve(cartPendingOperations);
                    }
                })


                i++;
            })
        })
    }


    findOperationSequence2(cartPendingOperation) {
        let _this = this;
        console.log('findOperationSequence2', cartPendingOperation)
        return new Promise(function (resolve, reject) {
            _this.findOperationSequence(cartPendingOperation.operation).then(operation => {


                cartPendingOperation.operation.sequences = operation.sequences;
                resolve(cartPendingOperation);

            })
        })
    }

                                                                                                                                                                                                                                                      findOperationSequence(operation) {
        let _this = this;

        return new Promise(function (resolve, reject) {

            //-*************************************************************************************************************
            _this.db['sequence_operations'].findAll({
                where: {
                    operation_id: operation.operation_id
                },
                order : [
                    ['sequence_order', 'ASC']
                ]
            }).then(operationSequences => {

                console.log('sequencesoperations', operationSequences.length)

                operation.sequences = [];
                let i = 0;
                operationSequences.forEach(function (s) {
                    operation.sequences.push(s);
                    i++;

                    if (i === operationSequences.length) {
                        resolve(operation)
                    }
                });

                if (operationSequences.length === 0) {
                    resolve(operation)
                }
            })


        })
    }


    getOperationsListOldAction2(req, res, next) {

        var db = require('../models');
        const Sequelize = require('sequelize');


        let addr = req.query.source_addr;
        let rfid_cart_bundle = req.query.rfid;

        if ((addr == null) || (addr == '')) {
            res.send('ADDR_NOT_PROVIDED');
            return;
        }

        if (rfid_cart_bundle == null || rfid_cart_bundle == '') {
            res.send('RFID_CART_BUNDLE_NOT_PROVIDED');
            return;
        }

        rfid_cart_bundle.substr(0, 10);

        try {

            db['carts'].findOne({
                where: {
                    rfid_cart: rfid_cart_bundle
                }
            }).then(cart => {
                let tag = 'C5';
                this.checkOpenSession(addr, tag).then(session => {


                    if (!session) {
                        res.send('INEXIST_SESSION');
                        return;
                    } else {


                        if (cart) {

                            db['bundle_carts'].findOne({
                                where: {
                                    cart_id: cart.cart_id
                                },
                                include: [{
                                    model: db['bundles'],
                                    include: [{
                                        model: db['ordres']
                                    }]
                                }]
                            }).then(bundleCart => {

                                // Affecter le bundle et le cart à la session courante

                                let bundle = bundleCart.bundle;
                                db['usersessions'].update({
                                    bundle_id: bundleCart.bundle.bundle_id,
                                    cart_id: cart.cart_id
                                }, {
                                    where: {
                                        usersession_id: session.usersession_id
                                    }
                                })

                                ////////// List Operations ///////////

                                db['boxes'].findOne({
                                    where: {
                                        box_macaddress: addr
                                    },
                                    include: [{
                                            model: db['machines'],
                                            include: [{
                                                    model: db['machine_types']
                                                },
                                                {
                                                    model: db['machine_groups']
                                                }
                                            ]
                                        }

                                    ]
                                }).then(box => {


                                    if (box) {


                                        let machineType = box.machine.machine_type;
                                        let machineGroupe = box.machine.machine_group;
                                        let ordre = bundle.ordre;
                                        let bundle_id = bundle.bundle_id;

                                        let machine_groupe = machineGroupe;
                                        let machine_type = machineType;

                                        // Récupérer la machine type manuel (Contrainte imposer par le client )
                                        var manuel_code_machine = 592;

                                        this.getCurrentOperations(bundle_id, session.box).then(pending_curr => {

                                            db['machine_types'].findOne({
                                                where: {
                                                    code: manuel_code_machine.toString()
                                                }
                                            }).then(manual => {


                                                // Récupération des operations à partir du  bundle courant , la machine type courante et la machine type manuel

                                                this.getBundleOperations(machineType, manuel_code_machine, machineGroupe, ordre)
                                                    .then((operations) => {

                                                        let current = new Date();
                                                        // à vérifier ----------------------------------
                                                        if (req.query.refresh === true) {

                                                            db['cart_pending_sessions'].findOne({
                                                                where: {
                                                                    session_id: session.usersession_id,
                                                                    updated_at: 'desc'
                                                                }
                                                            }).then(lastPending => {

                                                                if (lastPending) {
                                                                    current = lastPending.updated_at;
                                                                }
                                                            })
                                                        }
                                                        if (operations && operations.length > 0) {
                                                            // Récupération des pending operation du bundle courant

                                                            this.findAllOperationsReste(bundle_id, machine_groupe, machine_type, manual, box.machine)
                                                                .then(pending_cart => {


                                                                    if (pending_cart === null || pending_cart.length === 0) {
                                                                        //On insere les operation dans le pending operatiopendoprs-----------n
                                                                        let i = 0;
                                                                        operations.forEach(function (opr) {

                                                                            db['cart_pending_operations'].findOne({
                                                                                where: {
                                                                                    bundle_id: bundle_id,
                                                                                    operation_id: opr.operation_id,
                                                                                    finished: 1
                                                                                }
                                                                            }).then(checkPendingOperation => {
                                                                                //Check if there is already a finished Pending Operation with the same bundle, operationId but with other machine
                                                                                if (checkPendingOperation === null) {
                                                                                    let pending_carts = {};
                                                                                    pending_carts.operation_id = opr.operation_id;
                                                                                    pending_carts.finished = 0;
                                                                                    pending_carts.bundle_id = bundle_id;
                                                                                    pending_carts.datereadbundle = Date.now()
                                                                                    pending_carts.machine_id = session.machine.machine_id;


                                                                                    var modalObj = db['cart_pending_operations'].build(pending_carts);

                                                                                    modalObj.save()
                                                                                        .then(result => {});
                                                                                }


                                                                            })


                                                                        });

                                                                    } else {
                                                                        let pendoprs = [];

                                                                        //On recupere les pending oper id dans un tableau

                                                                        pending_cart.forEach(function (pend) {
                                                                            pendoprs.push(pend.operation.operation_id)
                                                                        });

                                                                        operations.forEach(function (opr) {

                                                                            // On teste si l'operation n'existe pas dans le pending operation
                                                                            // et donc on l'insert dans pinding operation
                                                                            if (pendoprs.indexOf(opr.operation_id) === -1) {

                                                                                db['cart_pending_operations'].findOne({
                                                                                    where: {
                                                                                        bundle_id: bundle_id,
                                                                                        operation_id: opr.operation_id,
                                                                                        finished: 1
                                                                                    }
                                                                                }).then(checkPendingOperation => {

                                                                                    if (checkPendingOperation === null) {
                                                                                        let pending_carts1 = {};
                                                                                        pending_carts1.operation_id = opr.operation_id;
                                                                                        pending_carts1.finished = 0;
                                                                                        pending_carts1.bundle_id = bundle_id;
                                                                                        pending_carts1.datereadbundle = Date.now()
                                                                                        pending_carts1.machine_id = session.machine.machine_id;


                                                                                        var modalObj = db['cart_pending_operations'].build(pending_carts1);

                                                                                        modalObj.save().then(result => {});
                                                                                    }

                                                                                })
                                                                            }
                                                                        })

                                                                    }
                                                                })
                                                        } else {
                                                            res.send('INEXIST_OPERATION');
                                                            return;
                                                        }
                                                    }) // Fin operations

                                                let operationsList = [];

                                                if (!req.query.refresh) {

                                                    db['cart_pending_operations'].findOne({}).then(lastPending => {
                                                        if (lastPending) {

                                                            db['cart_pending_operations'].update({
                                                                datereadbundle: Date.now(),
                                                                machine_id: session.machine.machine_id
                                                            }, {
                                                                where: {
                                                                    cart_pending_operation_id: lastPending.cart_pending_operation_id
                                                                }
                                                            })
                                                        }

                                                    })
                                                }

                                                //----------------------------------------------

                                                this.findAllOperationsReste(bundle_id, machine_groupe, machine_type, manual, box.machine)
                                                    .then(pending_cart => {

                                                        pending_cart.forEach(function (pending) {

                                                            // On retourne les operation à partir du pinding cart "finiched = 0" et qui ne sont pas affiché dans un autre box
                                                            if (pending.finished === 0 && pending_curr.indexOf(pending.operation.operation_id) !== -1) {
                                                                //--------------------------------------------------------------------------------------------------------
                                                                operationsList.push({
                                                                    // 'pending_cart': pending,
                                                                    'id': pending.cart_pending_operation_id,
                                                                    'label': pending.operation.machine_group.group.group_label + ' ' + pending.operation.label
                                                                })
                                                            }
                                                        });

                                                        if (operationsList && operationsList.length == 0) {
                                                            res.send('NO_OPERATION_IN_THE_BUNDLE');
                                                            return;
                                                        }

                                                        res.send({
                                                            //  'pending_cart':pending_cart,
                                                            'operationsList': operationsList,
                                                            'productivity': 99
                                                        })


                                                    });

                                            })

                                        })
                                    } else {
                                        res.send('ERROR_BOX');
                                        return;
                                    }


                                })

                            })

                        } else {
                            res.send('INEXIST_CART_NUM');
                            return;
                        }

                    }


                    // res.send(cart);
                    // return;
                });
            });

        } catch (e) {

            res.send('INTERNAL_SERVER_ERROR');
            return;

        }
    }

    getUserProduction() {
        return 99;
    }


    findAllOperationsReste(bundle, machine_groupe, machine_type, manual, machine) {
        return new Promise(function (resolve, reject) {

            var db = require('../models');

            let whereQuery = {};
            const Sequelize = require('sequelize');
            const Op = Sequelize.Op;
            //whereQuery[Op ['and']]
            if (machine_type > manual.machine_type_id) {
                var order = ['cart_pending_operation_id', 'ASC']
            } else {
                var order = ['cart_pending_operation_id', 'DESC']
            }

            db['cart_pending_operations'].findAll({

                where: {
                    $and: [{
                            '$machine.machine_type.machine_type_id$': machine_type.machine_type_id
                        },
                        {
                            '$machine.machine_group.machine_group_id$': machine_groupe.machine_group_id
                        },
                        {
                            '$bundle.bundle_id$': bundle
                        }
                    ]
                },
                include: [{
                        model: db['machines'],
                        include: [{
                                model: db['machine_types']
                            },
                            {
                                model: db['machine_groups'],
                                include: [{
                                    model: db['groups']
                                }]
                            }
                        ]
                    },
                    {
                        model: db['operations'],
                        include: [{
                            model: db['machine_groups'],
                            include: [{
                                model: db['groups']
                            }]
                        }]
                    },
                    {
                        model: db['bundles']
                    }
                ],
                //   order: [order],

            }).then(res => {

                resolve(res)
            })

        });
    }

    getBundleOperations(machineType, manual, machineGroup, ordre) {
        return new Promise(function (resolve, reject) {
            var db = require('../models');
            if (machineType.machine_type_id > manual) {
                var order = ['machine_type_id', 'DESC']

            } else {
                var order = ['machine_type_id', 'ASC']
            }

            db['operations'].findAll({

                where: {
                    $and: [{
                            machine_groupe_id: machineGroup.machine_group_id

                        },
                        {
                            ordre_id: ordre.ordre_id
                        }
                    ],
                    $or: [{
                            machine_type_id: machineType.machine_type_id
                        },
                        {
                            machine_type_id: manual
                        }
                    ]
                },
                include: [{
                        model: db['machine_types']
                    },
                    {
                        model: db['machine_groups']
                    }
                ],
                order: [order]
            }).then(operations => {

                resolve(operations)

            });
        })


    }


    checkOpenSession(addr, tag) {
        return new Promise(function (resolve, reject) {

            setTimeout(function () {

                var db = require('../models');
                var result = {};


                if (addr) {

                    db['boxes'].findOne({
                        where: {
                            box_macaddress: addr
                        },
                        include: [{
                            model: db['machines']
                        }]
                    }).then(box => {


                        if (box) {

                            db['usersessions'].findOne({
                                include: [{
                                        model: db['boxes'],
                                        include: [{
                                            model: db['machines']
                                        }]
                                    },
                                    {
                                        model: db['machines']
                                    }
                                ],
                                where: {
                                    machine_id: box.machine.machine_id
                                }
                            }).then(session => {


                                if (session) {

                                    db['usersessions'].update({
                                        last_tag: tag,
                                        usersession_export: 0
                                    }, {
                                        where: {
                                            usersession_id: session.usersession_id
                                        }
                                    }).then(result1 => {});


                                    if (session.time_in === null || session.time_in === '') {
                                        resolve(session);
                                    } else {
                                        resolve(false);
                                    }

                                } else {
                                    resolve(false);
                                }

                            })


                        } else {
                            resolve(false);
                        }


                    });

                } else {

                    resolve(false);
                }


            })
        }, 3000);
    }


    getCurrentOperations(bundle, box) {
        let operationDaoObj = this;
        return new Promise(function (resolve, reject) {
            operationDaoObj.findCurrentOperations(bundle, box).then(oprs => {
                let arr = [];

                if (oprs && oprs.length) {
                    let i = 0;
                    oprs.forEach(function (opr) {
                        arr[i] = opr.cart_pending_operation.operation.operation_id;
                        i++;
                    })
                }

                resolve(arr)
            })

        })
    }

    findCurrentOperations(bundle_id, box) {

        return new Promise(function (resolve, reject) {
            var db = require('../models');


            db['cart_pending_sessions'].findAll({
                where: {
                    status: 1,
                    '$usersession.box.box_id$': box.box_id,
                    '$cart_pending_operation.bundle.bundle_id$': bundle_id
                },
                include: [{
                        model: db['cart_pending_operations'],
                        as: 'cart_pending_operation',
                        include: [{
                                model: db['bundles'],
                                as: 'bundle'
                            },
                            {
                                model: db['operations'],
                                as: 'operation'
                            }
                        ]
                    },
                    {
                        model: db['usersessions'],
                        as: 'usersession',
                        include: [{
                            model: db['boxes']
                        }]
                    }
                ]
            }).then(cardPendingsession => {

                resolve(cardPendingsession);
            })

        });
    }

    operationFinished(req, res, next) {

        let cps_id = req.query.cps_id;
        let quantity = req.query.quantity;
        let time = req.query.time;
        let endtime = req.query.endtime;
        let work_quality = req.query.work_quality;
        let system_quantity = req.query.system_quantity;


        if ((work_quality == null) || (work_quality == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'work_quality not provided',
                    internalMessage: 'work_quality not provided',
                    code: 4010
                }]
            });
            return;
        }

        if ((system_quantity == null) || (system_quantity == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'system_quantity not provided',
                    internalMessage: 'system_quantity not provided',
                    code: 4011
                }]
            });
            return;
        }

        if ((cps_id == null) || (cps_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'CPS_ID not provided',
                    internalMessage: 'CPS_ID not provided',
                    code: 7000
                }]
            });
            return;
        }

        if ((quantity == null) || (quantity == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'Quantity not provided',
                    internalMessage: 'Quantity not provided',
                    code: 1022
                }]
            });
            return;
        }

        if ((time == null) || (time == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'Time not provided',
                    internalMessage: 'Time not provided',
                    code: 1023
                }]
            });
            return;
        }

        if ((endtime == null) || (endtime == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'End time not provided',
                    internalMessage: 'End time not provided',
                    code: 1026
                }]
            });
            return;
        }

        var _this = this;


        _this.db['cart_pending_sessions'].findOne({
            where: {
                cart_pending_session_id: cps_id,
                end_time: null
            },
            include: [{
                model: _this.db['cart_pending_operations'],
                include: [{
                    model: _this.db['operations']
                }]
            }]
        }).then(cps => {
            if (cps) {


                var cps = cps;
                var quantity_operation = cps.cart_pending_operation.operation.quantity;

                if (cps.cart_pending_operation.quantity === '' || cps.cart_pending_operation.quantity === null) {
                    var quantity_CPO = 0;
                } else {
                    var quantity_CPO = cps.cart_pending_operation.quantity;
                }
                var total_quantity = 0;
                total_quantity = parseInt(quantity_CPO) + parseInt(quantity);


                if (quantity < quantity_operation && total_quantity < quantity_operation) {

                    console.log('*********** 1 ')

                    //soustraction

                    _this.db['cart_pending_operations'].update({
                        quantity: total_quantity,
                        finished: 0,
                        time: time,
                        endtime: new Date(endtime * 1000).getTime(),
                        in_progress : 'N'

                    }, {
                        where: {
                            cart_pending_operation_id: cps.cart_pending_operation.cart_pending_operation_id,

                        }
                    }).then(cpo_updated => {
                        cps.cart_pending_operation.quantity = total_quantity;
                        cps.cart_pending_operation.finished = 0;
                        cps.cart_pending_operation.time = time;

                        cps.quantity = quantity;
                        cps.time = time;


                        _this.db['cart_pending_sessions'].update({

                            quantity: quantity,
                            time: time,
                            end_time: new Date(endtime * 1000),
                            system_quantity: system_quantity,
                            work_quality: work_quality,
                            in_progress : 'N'
                        }, {
                            where: {
                                cart_pending_session_id: cps.cart_pending_session_id
                            }
                        }).then(cpsUpdated => {
                            res.send({
                                success: true,
                                data: cps,
                                messages: [{
                                    userMessage: 'Operation updated',
                                    internalMessage: 'Operation updated',
                                    code: 4007
                                }]
                            });
                            return;
                        });


                    })



                } else if (total_quantity === quantity_operation) {
                    //finished
                    console.log('*********** 2')

                    _this.db['cart_pending_operations'].update({

                        quantity: total_quantity,
                        finished: 1,
                        time: time,
                        dateend: new Date(endtime * 1000).getTime(),
                        in_progress : 'N'
                    }, {
                        where: {
                            cart_pending_operation_id: cps.cart_pending_operation.cart_pending_operation_id
                        }
                    }).then(cpoUpdated => {

                        // --update Bundles

                        _this.db['cart_pending_operations'].findOne({
                            where : {
                                cart_pending_operation_id: cps.cart_pending_operation.cart_pending_operation_id
                            }
                        }).then(cpo => {

                            let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                'where cpo.bundle_id = ' + cpo.bundle_id

                            _this.db.sequelize.query(allOperationSQL, {
                                type: _this.db.sequelize.QueryTypes.SELECT
                            })
                                .then(count_allOperations => {

                                    let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                        'where cpo.bundle_id = ' + cpo.bundle_id + ' and cpo.finished = 1'

                                    _this.db.sequelize.query(allOperationSQL, {
                                        type: _this.db.sequelize.QueryTypes.SELECT
                                    })
                                        .then(finished_operations_count => {

                                            if (count_allOperations[0].count === finished_operations_count[0].count) {

                                                _this.db['bundles'].update({

                                                    finish_date: new Date(endtime * 1000)
                                                }, {
                                                    where: {
                                                        bundle_id:  cpo.bundle_id
                                                    }
                                                }).then(bundleUpdated => {

                                                })
                                            }


                                            _this.db['cart_pending_sessions'].update({

                                                quantity: quantity,
                                                time: time,
                                                end_time: new Date(endtime * 1000).getTime(),
                                                system_quantity: system_quantity,
                                                work_quality: work_quality,
                                                in_progress : 'N'

                                            }, {
                                                where: {
                                                    cart_pending_session_id: cps.cart_pending_session_id,
                                                    end_time: null
                                                }
                                            }).then(cpsUpdated => {

                                                cps.cart_pending_operation.quantity = total_quantity;
                                                cps.cart_pending_operation.finished = 0;
                                                cps.cart_pending_operation.time = time;

                                                cps.quantity = quantity;
                                                cps.time = time;

                                                res.send({
                                                    success: true,
                                                    data: cps,
                                                    messages: [{
                                                        userMessage: 'Operation already updated and finished',
                                                        internalMessage: 'Operation already updated and finished',
                                                        code: 4006
                                                    }]
                                                });
                                                return;

                                            });

                                        })

                                })
                        })



                    });




                } else {
                    let sql ='select sum(cps.quantity) as cps_quantity, sum(cps.reparation) as total_reparation from cart_pending_sessions as cps \n ' +
                    'where cps.cart_pendingoperation_id = ' + cps.cart_pendingoperation_id
                    _this.db.sequelize.query(sql,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(cps_quantity => {
                        let total = parseInt(quantity_operation) - parseInt(cps_quantity[0].cps_quantity)
                        let reparation = quantity - total
                        let cpo_reparation = 0
                        if (parseInt(cps_quantity[0].cps_quantity) !== null ) {
                            cpo_reparation = parseInt(cps_quantity[0].total_reparation)
                        }

                        console.log('*********** 3')

                        _this.db['cart_pending_operations'].update({
                            reparation : cpo_reparation + reparation,
                            quantity: quantity_operation,
                            finished: 1,
                            in_progress : 'N',
                            time: time,
                            dateend: new Date(endtime * 1000).getTime()
                        }, {
                            where: {
                                cart_pending_operation_id: cps.cart_pending_operation.cart_pending_operation_id
                            }
                        }).then(cpoUpdated => {

                            // --update Bundles

                            _this.db['cart_pending_operations'].findOne({
                                where : {
                                    cart_pending_operation_id: cps.cart_pending_operation.cart_pending_operation_id
                                }
                            }).then(cpo => {

                                let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                    'where cpo.bundle_id = ' + cpo.bundle_id

                                _this.db.sequelize.query(allOperationSQL, {
                                    type: _this.db.sequelize.QueryTypes.SELECT
                                })
                                    .then(count_allOperations => {

                                        let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                            'where cpo.bundle_id = ' + cpo.bundle_id + ' and cpo.finished = 1'

                                        _this.db.sequelize.query(allOperationSQL, {
                                            type: _this.db.sequelize.QueryTypes.SELECT
                                        })
                                            .then(finished_operations_count => {

                                                if (count_allOperations[0].count === finished_operations_count[0].count) {

                                                    _this.db['bundles'].update({

                                                        finish_date: new Date(endtime * 1000)
                                                    }, {
                                                        where: {
                                                            bundle_id:  cpo.bundle_id
                                                        }
                                                    }).then(bundleUpdated => {

                                                    })
                                                }


                                                _this.db['cart_pending_sessions'].update({

                                                    quantity: total,
                                                    time: time,
                                                    reparation: reparation,
                                                    end_time: new Date(endtime * 1000).getTime(),
                                                    system_quantity: system_quantity,
                                                    work_quality: work_quality,
                                                    in_progress : 'N'

                                                }, {
                                                    where: {
                                                        cart_pending_session_id: cps.cart_pending_session_id,
                                                        end_time: null
                                                    }
                                                }).then(cpsUpdated => {

                                                    cps.cart_pending_operation.quantity = quantity_operation;
                                                    cps.cart_pending_operation.finished = 1;
                                                    cps.cart_pending_operation.time = time;
                                                    cps.reparation = reparation


                                                    cps.quantity = total;
                                                    cps.time = time;

                                                    console.log('quantity_operation', quantity_operation)
                                                    console.log('cps_quantity[0].cps_quantity', cps_quantity[0].cps_quantity)
                                                    res.send({
                                                        success: true,
                                                        data: cps,
                                                        messages: [{
                                                            userMessage: 'Operation already updated and finished',
                                                            internalMessage: 'Operation already updated and finished',
                                                            code: 4006
                                                        }]
                                                    });
                                                    return;
                                                });

                                            })

                                    })
                            })





                        });



                    })
                }
                // else {

                //     res.send({
                //         success: false,
                //         data: null,
                //         messages: [{
                //             userMessage: 'Invalide Quantity',
                //             internalMessage: 'Invalide Quantity',
                //             code: 1024
                //         }]
                //     });
                //     return;

                // }


            } else {

                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: 'CPS does not exists',
                        internalMessage: 'CPS does not exists',
                        code: 7001
                    }]
                });
                return;

            }


        });
    }

    startOperation(req, res, next) {

        let cpo_id = req.query.cpo_id;
        let usersession_id = req.query.usersession_id;
        let starttime = req.query.starttime;

        var _this = this;

        if ((cpo_id == null) || (cpo_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'CPO_ID not provided',
                    internalMessage: 'CPO_ID not provided',
                    code: 7002
                }]
            });
            return;
        }


        if ((starttime == null) || (starttime == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'Start time not provided',
                    internalMessage: 'Start time not provided',
                    code: 1025
                }]
            });
            return;
        }

        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'User session does not exists',
                    internalMessage: 'User session does not exists',
                    code: 1008
                }]
            });
            return;
        }

        _this.db['usersessions'].findOne({

            where: {
                usersession_id: usersession_id
            }

        }).then(usersession => {

            if (usersession) {

                _this.db['cart_pending_operations'].findOne({

                    where: {
                        cart_pending_operation_id: cpo_id
                    },
                    include : [
                        {
                            model : _this.db['bundles']
                        }
                    ]


                }).then(cpo => {


                    if (cpo) {


                        if (Number(cpo.quantity) === 0) {

                            let allOperationsSQL = 'select count(cpo.*) \n' +
                                'from cart_pending_operations cpo\n' +
                                'where cpo.bundle_id = ' + cpo.bundle_id


                            _this.db.sequelize.query(allOperationsSQL,
                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                .then(operationCount => {
                                    console.log('all operations = ', operationCount[0].count)

                                    let sql = 'select count(cpo.*) \n' +
                                        'from cart_pending_operations cpo\n' +
                                        'where cpo.bundle_id = ' + cpo.bundle_id + ' and cpo.datestart is null'

                                    _this.db.sequelize.query(sql,
                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                        .then(cpo_not_started => {

                                            if ( cpo_not_started[0].count === operationCount[0].count) {
                                                _this.db['bundles'].update({
                                                    start_date: new Date(starttime * 1000),
                                                }, {
                                                    where: {
                                                        bundle_id: cpo.bundle_id
                                                    }
                                                }).then(result1 => {

                                                })
                                            }
                                        })

                                })
                            this.db['cart_pending_operations'].update({
                                in_progress: 'Y',
                                quantity: 0,
                                datestart: new Date(starttime * 1000)

                            }, {
                                where: {

                                    cart_pending_operation_id: cpo_id,
                                    active: 'Y'
                                }
                            }).then(result1 => {

                            })
                        } else {
                            this.db['cart_pending_operations'].update({
                                in_progress: 'Y',
                                datestart: new Date(starttime * 1000)

                            }, {
                                where: {

                                    cart_pending_operation_id: cpo_id,
                                    active: 'Y'
                                }
                            }).then(result1 => {





                            })
                        }
                        this.db['cart_pending_sessions'].update({
                            active: 'N',
                        }, {
                            where: {
                                session_id: usersession_id,
                                cart_pendingoperation_id: cpo_id,
                                end_time: null,
                                active: 'Y'
                            }
                        }).then(result1 => {
                            var modalObj = _this.db['cart_pending_sessions'].build({
                                session_id: usersession_id,
                                cart_pendingoperation_id: cpo_id,
                                created_at: new Date(starttime * 1000).getTime(),
                                quantity: 0,
                                active: 'Y',
                                in_progress: 'Y',
                                start_time: new Date(starttime * 1000).getTime()
                            });

                            modalObj.save()
                                .then(cps => {

                                    if (cps) {
                                        res.send({
                                            success: true,
                                            data: cps,
                                            messages: [{
                                                userMessage: 'Start operation with success',
                                                internalMessage: 'Start operation with success',
                                                code: 4003
                                            }]
                                        });
                                        return;
                                    } else {
                                        res.send({
                                            success: false,
                                            data: null,
                                            messages: [{
                                                userMessage: 'Failed to create operation',
                                                internalMessage: 'Failed to create operation',
                                                code: 4009
                                            }]
                                        });
                                        return;
                                    }


                                });
                        })


                    } else {
                        res.send({
                            success: false,
                            data: null,
                            messages: [{
                                userMessage: 'Cart Pending Operation does not exists',
                                internalMessage: 'Cart Pending Operation does not exists',
                                code: 7003
                            }]
                        });
                        return;
                    }

                });

            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: 'User session does not exists',
                        internalMessage: 'User session does not exists',
                        code: 1008
                    }]
                });
                return;
            }

        })
    }

    async generate_direct_production(req, res, next) {

        let Sequelize = require('sequelize');

        let _this = this;

        let rfid = req.body.rfid;
        let line_id = req.body.line_id;
        let operations_template = req.body.operation_templates;

        if (rfid === '') {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid RFID data",
                    internalMessage: 'Invalid RFID data',
                    code: 1001,
                }],
                attributes: [],
                status: 500
            });
            return;
        }

        if (line_id === '') {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Line ID not provided",
                    internalMessage: 'Line ID not provided',
                    code: 1038,
                }],
                attributes: [],
                status: 500
            });
            return;
        }

        const page1 = await _this.db['lines'].findOne({
            where: {
                line_id: req.body.line_id,
                active: 'Y'
            }
        }).then(line => {

            if (line) {

                if (line.direct_production_mode_id === '') {
                    res.send({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "Line does not contain a mode of production",
                            internalMessage: 'Line does not contain a mode of production',
                            code: 1040,
                        }],
                        attributes: [],
                        status: 500
                    });
                    return;
                } else {

                    _this.db['carts'].findOne({
                        where: {
                            'rfid_cart': rfid,
                            'active': 'Y'
                        }
                    }).then(cart => {
                        if (cart) {

                            _this.db['carts'].update({
                                active: 'N'
                            }, {
                                where: {
                                    cart_id: cart.cart_id
                                }
                            }).then(cart_updated => {
                                _this.db['bundle_carts'].update({
                                    active: 'N'
                                }, {
                                    where: {
                                        cart_id: cart.cart_id
                                    }
                                })
                            }).then(bundle_cart_updated => {

                                _this.db['carts'].build({
                                    rfid_cart: rfid,
                                    created_at: new Date().getTime() / 1000
                                }).save().then(cart_saved => {


                                    _this.generateOperationProductionMode(operations_template, line.direct_production_mode_id).then(res_generateOperationProductionMode => {


                                        _this.db['direct_production_modes'].findOne({
                                            where: {
                                                direct_production_mode_id: line.direct_production_mode_id
                                            }
                                        }).then(direct_production_mode => {

                                            _this.db['orders'].build({

                                                label: direct_production_mode.label,
                                                description: direct_production_mode.description,
                                                quantity: 1,
                                                article_id: direct_production_mode.article_id

                                            }).save().then(order_saved => {
                                                _this.db['orders'].update({
                                                    code: order_saved.order_id + direct_production_mode.order_prefix
                                                }, {
                                                    where: {
                                                        order_id: order_saved.order_id
                                                    }
                                                }).then(order_updated => {

                                                    _this.db['bundles'].build({
                                                        order_id: order_saved.order_id,
                                                        variant1: direct_production_mode.bundle_varient,
                                                        created_at: new Date().getTime() / 1000,
                                                        bundle_qte: 1,

                                                    }).save().then(bundle_saved => {

                                                        _this.db['bundles'].update({
                                                            code_bundle: bundle_saved.bundle_id + direct_production_mode.bundle_prefix
                                                        }, {
                                                            where: {
                                                                bundle_id: bundle_saved.bundle_id
                                                            }
                                                        }).then(bundle_updated => {

                                                            _this.getOperationsTemplateByLinePromise(line_id).then(operationTemplates => {

                                                                _this.generateOperations(operationTemplates, bundle_saved.bundle_id, line.line_id).then(generateOperationResult => {

                                                                    _this.operationsByLineAndBundle(bundle_saved.bundle_id, line_id).then(operations => {

                                                                        _this.generateCPO(operations).then(CPO_generated => {
                                                                            res.send('ok');
                                                                            return;
                                                                        })
                                                                    })

                                                                })


                                                            })

                                                        });

                                                    });

                                                });

                                            });

                                        });

                                    })


                                })


                            });


                        } else {
                            _this.db['carts'].build({
                                rfid_cart: rfid,
                                created_at: new Date().getTime() / 1000
                            }).save().then(cart_saved => {

                                _this.db['direct_production_modes'].build({

                                    label: req.body.label,
                                    description: req.body.description,
                                    order_prefix: req.body.order_prefix,
                                    bundle_prefix: req.body.bundle_prefix,
                                    bundle_varient: req.body.bundle_varient,
                                    article_id: req.body.article_id

                                }).save().then(result1 => {
                                    res.send(cart_saved);
                                    return;
                                });

                            });
                        }
                    });
                }

            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: "Line ID does not exist",
                        internalMessage: 'Line ID does not exist',
                        code: 1039,
                    }],
                    attributes: [],
                    status: 500
                });
                return;
            }
        });
    }

    allOperationTemplatesByMachineType(machinesTypes) {
        let _this = this;

        let operationsTemplate = [];
        return new Promise(function (resolve, reject) {

            if (machinesTypes.length === 0) {
                resolve([])
            }

            let i = 0;

            machinesTypes.forEach(function (machineType) {
                _this.db['operation_templates'].findAll({
                    where: {
                        machine_type_id: machineType.machine_type_id
                    }
                }).then(resultOperationsTemplate => {

                    /*_this.pushObjects(resultOperationsTemplate, operationsTemplate).then(operationsTemplates => {
                        operationsTemplate = [];
                        operationsTemplate = operationsTemplates;
                        if (i === resultOperationsTemplate.length) {
                            resolve(operationsTemplate);
                        }
                    });*/
                    resultOperationsTemplate.forEach(item => {
                        operationsTemplate.push(item);
                    });
                    i++;
                    if (i === machinesTypes.length) {
                        resolve(operationsTemplate);
                    }

                })

            })
        })
    }

    pushObjects(objects, op) {

        return new Promise(function (resolve, reject) {
            let i = 0;
            objects.forEach(o => {
                op.push(o);

                i++;
                if (i === objects.length) {
                    resolve(op)
                }
            })

        });
    }


    generateOperationProductionMode(operations_template, direct_productionModeID) {
        let _this = this;


        return new Promise(function (resolve, reject) {

            if (operations_template.length === 0) {
                resolve('ok')
            }
            let i = 0;
            operations_template.forEach(function (operationTemplate) {

                _this.db['operation_direct_production_modes'].build({

                    direct_production_mode_id: direct_productionModeID,
                    operation_template_id: operationTemplate.operation_template_id,
                    order: operationTemplate.order

                }).save().then(result1 => {

                    i++;
                    if (i === operations_template.length) {
                        resolve('ok')
                    }

                })
            })
        });
    }


    getOperationsTemplateByLinePromise(line_id) {

        let Sequelize = require('sequelize');
        let _this = this;
        let i = 0;
        return new Promise(function (resolve, reject) {
            _this.db['machines'].findAll({
                attributes: [
                    // specify an array where the first element is the SQL function and the second is the alias
                    [Sequelize.fn('DISTINCT', Sequelize.col('machine_type_id')), 'machine_type_id']
                ],
                where: {
                    line_id: line_id
                }
            }).then(machine_types => {
                _this.allOperationTemplatesByMachineType(machine_types).then(operations_templates_result => {
                    resolve(operations_templates_result);
                })
            })
        })
    }


    getOperationsTemplateByLine(req, res, next) {

        let Sequelize = require('sequelize');
        let _this = this;
        let line_id = req.query.line_id
        _this.db['lines'].findOne({
            where: {
                line_id: line_id,
                active: 'Y'
            }
        }).then(line => {


            if (line) {

                if (line.direct_production_mode_id === '') {
                    res.send({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "Line does not contain a mode of production",
                            internalMessage: 'Line does not contain a mode of production',
                            code: 1040,
                        }],
                        attributes: [],
                        status: 500
                    });
                    return;
                } else {
                    _this.db['machines'].findAll({
                        attributes: [
                            // specify an array where the first element is the SQL function and the second is the alias
                            [Sequelize.fn('DISTINCT', Sequelize.col('machine_type_id')), 'machine_type_id']
                        ],
                        where: {
                            line_id: line_id
                        }
                    }).then(machine_types => {

                        var operations_template = []
                        _this.allOperationTemplatesByMachineType(machine_types).then(operations_templates_result => {
                            // ---------------------------------------------------------------- Here

                            res.send(operations_templates_result);
                            return;

                        })
                    })
                }
            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: "Line ID does not exist",
                        internalMessage: 'Line ID does not exist',
                        code: 1039,
                    }],
                    attributes: [],
                    status: 500
                });
                return;
            }
        });
    }

    generateOperations(operationTemplates, bundle_id, line_id) {
        let _this = this;

        return new Promise(function (resolve, reject) {
            if (operationTemplates.length === 0) {
                resolve('ok')
            }

            var i = 0;
            operationTemplates.forEach(function (operationTemplate) {
                _this.db['operations'].build({
                    quantity: 1,
                    label: operationTemplate.label,
                    description: operationTemplate.description,
                    op_code: operationTemplate.op_code,
                    bundle_id: bundle_id,
                    machine_type_id: operationTemplate.machine_type_id,
                    line_id: line_id
                }).save().then(operation => {
                    i++;
                    if (i === operationTemplates.length) {
                        resolve('ok');
                    }
                });
            })
        })

    }


    generateCPO(operations) {
        let _this = this;

        console.log('generateCPO', operations.length)
        return new Promise(function (resolve, reject) {
            let i = 0;

            if (operations.length === 0) {
                resolve('ok');
                return;
            }
            operations.forEach(operation => {
                let pending_carts = {};
                pending_carts.operation_id = operation.operation_id;
                pending_carts.finished = 0;
                pending_carts.bundle_id = operation.bundle_id;
                pending_carts.datereadbundle = Date.now();
                // pending_carts.machine_id = machine_id;

                pending_carts.quality = 0;
                var modalObj = _this.db['cart_pending_operations'].build(pending_carts);
                modalObj.save()
                    .then(result => {
                        i++;
                        if (i === operations.length) {
                            resolve('ok');
                        }
                    });
            })
        })
    }

    operationsByLineAndBundle(bundle_id, line_id) {
        let _this = this;


        return new Promise(function (resolve, reject) {
            _this.db['operations'].findAll({
                where: {
                    line_id: line_id,
                    bundle_id: bundle_id

                }
            }).then(operations => {

                console.log('operations., ', operations.length)
                resolve(operations);
                return;

            });
        });


    }

    getOperationsListOldAction(req, res, next) {
        //let addr = req.query.source_addr;
        let _this = this
        var db = require('../models');
    
        let rfid_cart_bundle = req.query.cart_rfid;
    
        let session_id = req.query.usersession_id;
    
        if (rfid_cart_bundle == null || rfid_cart_bundle == '') {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'Invalid RFID data',
                    internalMessage: 'Invalid RFID data',
                    code: 1001
                }]
            });
            return;
        } else {
            rfid_cart_bundle = rfid_cart_bundle.substr(0, 10);
        }
        if (session_id == null || session_id == '') {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'Invalid user session data',
                    internalMessage: 'Invalid user session data',
                    code: 1006
                }]
            });
            return;
        }
        db['usersessions'].findOne({
            where: {
                usersession_id: session_id,
                time_out: null
            },
            include: [{
                model: db['boxes'],
                include: [{
                    model: db['machines'],
                    include: [{
                        model: db['machine_types']
                    }]
                }]
            }]
        }).then(userSession => {
    
    
            if (userSession) {
                // 2 - Valider la carte
    
                let sqlBundle = "SELECT max(cart_id) FROM carts WHERE rfid_cart = '" + rfid_cart_bundle + "'";
    
                // 1. last bundleMaintenanceTaskController
                db.sequelize.query(sqlBundle, {
                    type: db.sequelize.QueryTypes.SELECT
                })
                    .then(cart_id => {
    
                        db['carts'].findOne({
                            where: {
                                cart_id: cart_id[0].max
                            }
                        }).then(cart => {
    
                            if (cart) {
                                db['bundle_carts'].findOne({
                                    where: {
                                        cart_id: cart.cart_id
                                    },
                                    include: [{
                                        model: db['bundles'],
                                        include: [{
                                            model: db['orders']
                                        }]
                                    }]
                                }).then(bundleCart => {
    
                                    if (bundleCart) {
    
                                        db['machine_operation_templates'].findAll({
                                            where: {
                                                machine_id: userSession.box.machine.machine_id
                                            },
                                            include: [
                                                {
                                                    model: _this.db['operation_templates']
                                                },
                                                {
                                                    model: _this.db['machines']
                                                }
                                            ]
                                        }).then(machine_operation_templates => {

                                            // res.send(machine_operation_templates); return
    
                                     
                                            if (machine_operation_templates && machine_operation_templates.length > 0) {

                                                
                                                          var promise1 = new Promise(function (resolve, reject) {
        
                                                              var cpo_result = []
                                                              machine_operation_templates.forEach(machine_operation_template_item => {
        
                                                                  _this.db['cart_pending_operations'].findAll({
                                                                      where: {
                                                                          '$operation.machine_type_id$': userSession.box.machine.machine_type_id,
                                                                           finished: 0,
                                                                           active: 'Y',
                                                                          '$operation.op_code$': machine_operation_template_item.operation_template.op_code,
                                                                           bundle_id: bundleCart.bundle_id,
                                                                           in_progress: 'N'
                                                                      },
                                                                      include: [
                                                                          {
                                                                              model: _this.db['operations'],
        
                                                                          },
                                                                          {
                                                                              model: _this.db['bundles'],
                                                                              include: [{
                                                                                  model: _this.db['orders']
                                                                              }]
                                                                          }
                                                                      ],
                                                                      order: [
                                                                          ['bundle_id', 'ASC']
                                                                      ]
                                                                  }).then(cartPendingOperations => {

                                                                    var promise2 = new Promise(function (resolve, reject) {
                                                                          cartPendingOperations.forEach(cpo_item => {
        
                                                                                  cpo_result.push(cpo_item)
        
                                                                              setTimeout(resolve, 100, cpo_result);
        
                                                                          })
                                                                      })
                                                                    })
        
                                                                  setTimeout(resolve, 100, cpo_result);
                                                              })

                                            })
        
                                                            Promise.all([promise1]).then(function (cpo_result) {
                                                                _this.generateSequenceOperation(cpo_result[0]).then(c => {
                                                                    res.send({
                                                                        success: true,
                                                                        data: c,
                                                                        status: 200
                                                                    });
                                                                })
                                                            })
                                            }
                                            else {

                                                console.log('2')
                                                // 3 - Chercher Cart-pending-Operations qui sont liées au bundle et au même type du machine
    
                                                 db['operations'].findAll({
                                                    where: {
                                                        bundle_id: bundleCart.bundle_id,
                                                        machine_type_id: userSession.box.machine.machine_type_id
                                                    }
                                                }).then(operations => {
    
                                                 
    
                                                    if (operations && operations.length > 0) {
    
                                                        let async = require('async');
    
                                                        // 1 *********************************************************************************************************
    
                                                        db['cart_pending_operations'].findAll({
                                                            where: {
                                                                //  finished: 1,
                                                                bundle_id: bundleCart.bundle_id,
                                                                '$operation.machine_type_id$': userSession.box.machine.machine_type_id,
                                                                finished: 0,
                                                                in_progress : 'N',
                                                                active: 'Y',
                                                            },
                                                            include: [{
                                                                model: db['operations']
                                                            },
                                                            {
                                                                model: db['bundles'],
                                                                include: [{
                                                                    model: db['orders']
                                                                }]
                                                            }
                                                            ],
                                                            order: [
                                                                ['cart_pending_operation_id', 'DESC']]
                                                        }).then(cartPendingOperations => {

                                                            _this.generateSequenceOperation(cartPendingOperations).then(c => {


                                                                res.send({
                                                                    success: true,
                                                                    data: c,
                                                                    status: 200
                                                                });
                                                                return;
                                                            })
    
    
                                                            // if (cartPendingOperations.length === 0) {
                                                            //
                                                            //     let _this = this
                                                            //
                                                            //     _this.saveCPO(operations, bundleCart.bundle_id, userSession.box.machine.machine_id).then(savedCpo => {
                                                            //
                                                            //         db['cart_pending_operations'].findAll({
                                                            //             where: {
                                                            //                 //  finished: 1,
                                                            //                 bundle_id: bundleCart.bundle_id,
                                                            //                 '$operation.machine_type_id$': userSession.box.machine.machine_type_id
                                                            //             },
                                                            //             include: [{
                                                            //                 model: db['operations']
                                                            //             },
                                                            //             {
                                                            //                 model: db['bundles'],
                                                            //                 include: [{
                                                            //                     model: db['orders']
                                                            //                 }]
                                                            //             }
                                                            //             ],
                                                            //             order: [
                                                            //                 ['cart_pending_operation_id', 'DESC']]
                                                            //         }).then(cartPendingOperations => {
                                                            //
                                                            //             _this.generateSequenceOperation(cartPendingOperations).then(c => {
                                                            //
                                                            //
                                                            //                 res.send({
                                                            //                     success: true,
                                                            //                     data: c,
                                                            //                     status: 200
                                                            //                 });
                                                            //                 return;
                                                            //             })
                                                            //         })
                                                            //
                                                            //
                                                            //
                                                            //     });
                                                            //
                                                            // } else {
                                                            //
                                                            //     db['cart_pending_operations'].findAll({
                                                            //         where: {
                                                            //             finished: 0,
                                                            //             bundle_id: bundleCart.bundle_id,
                                                            //             '$operation.machine_type_id$': userSession.box.machine.machine_type_id
                                                            //         },
                                                            //         include: [{
                                                            //             model: db['operations']
                                                            //         },
                                                            //         {
                                                            //             model: db['bundles'],
                                                            //             include: [{
                                                            //                 model: db['orders']
                                                            //             }]
                                                            //         }
                                                            //         ],
                                                            //         order: [
                                                            //             ['cart_pending_operation_id', 'DESC']]
                                                            //     }).then(cartPendingOperations => {
                                                            //
                                                            //         this.generateSequenceOperation(cartPendingOperations).then(c => {
                                                            //             res.send({
                                                            //                 success: true,
                                                            //                 data: c,
                                                            //                 status: 200
                                                            //             });
                                                            //             return;
                                                            //         })
                                                            //
                                                            //     })
                                                            //
                                                            //
                                                            // }
                                                        });
    
                                                    } else {
                                                        res.send({
                                                            success: false,
                                                            data: null,
                                                            messages: [{
                                                                userMessage: 'The bundle does not contain operations',
                                                                internalMessage: 'The bundle does not contain operations',
                                                                code: 4002
                                                            }]
                                                        });
                                                        return;
                                                    }
    
                                                })
    
    
    
                                            }
                                        })
                                    } else {
                                        res.send({
                                            success: false,
                                            data: null,
    
    
                                            messages: [{
                                                userMessage: 'Invalid cart Bundle data',
                                                internalMessage: 'Invalid cart Bundle data',
                                                code: 1011
                                            }]
                                        });
                                        return;
                                    }
                                })
                            }
                            else {
                                res.send({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: 'Invalid cart data',
                                        internalMessage: 'Invalid cart data',
                                        code: 1016
                                    }]
                                });
                                return;
                            }
                        })
                    })
    
            } else {
    
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: 'User session does not exists',
                        internalMessage: 'User session does not exists',
                        code: 1008
                    }]
                });
                return;
            }
    
        })
    }


}

module.exports = OperationDao;
