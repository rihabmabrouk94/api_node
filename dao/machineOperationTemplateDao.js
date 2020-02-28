const {baseModelDao} = require('./baseModalDao');

class MachineOperationTemplateDao extends baseModelDao {
    constructor() {
        super('machine_operation_templates', 'machine_operation_template_id');
        this.baseModal = 'machine_operation_templates';
        this.primaryKey = 'machine_operation_template_id';
    }

    getOperationTemplateList(req, res, next) {
        let _this = this;
        let usersession_id = req.query.usersession_id;
        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'User session does not exists',
                        internalMessage: 'User session does not exists',
                        code: 1008
                    }
                ]
            });
            return;
        }
        _this.db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id,
                active: 'Y'
            }
        })
            .then(usersessions => {
                if (usersessions) {
                    _this.db['boxes'].findOne({
                        where: {
                            box_id: usersessions.box_id,
                            active: 'Y'
                        }
                    })
                        .then(boxes => {
                                if (boxes) {
                                    _this.db['machines'].findOne({
                                        where: {
                                            machine_id: boxes.machine_id,
                                            active: 'Y'
                                        }
                                    })
                                        .then(machines => {
                                            if (machines) {
                                                _this.db['machine_operation_templates'].findAll({
                                                    where: {
                                                        machine_id: machines.machine_id,
                                                        active: 'Y'
                                                    },
                                                    include: [{
                                                        model: this.db['operation_templates']
                                                    }]
                                                })
                                                    .then(machine_operation_templates => {
                                                        if (machine_operation_templates) {
                                                            res.json({
                                                                success: true,
                                                                data: machine_operation_templates,
                                                                attributes: [],
                                                                status: 200
                                                            });
                                                        } else {
                                                            res.json({
                                                                success: false,
                                                                data: null,
                                                                userMessage: "Machine Operation Templates not exist",
                                                                attributes: [],
                                                                status: 500
                                                            });
                                                        }

                                                    })
                                            } else {
                                                res.json({
                                                    success: false,
                                                    data: null,
                                                    userMessage: "Machine not exist",
                                                    attributes: [],
                                                    status: 500
                                                });
                                            }

                                        })
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        userMessage: "Box not exist",
                                        attributes: [],
                                        status: 500
                                    });
                                }
                            }
                        ).catch(err =>
                        res.status(500).json(err)
                    )
                } else {
                    res.json({
                        success: false,
                        data: null,
                        userMessage: "Usersession not exist",
                        attributes: [],
                        status: 500
                    });
                }

            })

    }


    updateMachineOperationTemplate(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['machine_operation_templates'].findAll({
            include: [{
                model: this.db['operation_templates'],
                as: 'operation_template',
            }],
            where: {
                machine_id: params.machine_id
            }
        }).then(data => {
            var oldOperationTemplates = [];

            data.forEach(operation_template => {
                oldOperationTemplates.push(operation_template.operation_template.operation_template_id);
            });

            if (params && params.operation_templates) {

                params.operation_templates.forEach(newOperation_template => {

                    if (oldOperationTemplates.indexOf(newOperation_template) === -1) {

                        var modalObj = this.db[this.baseModal].build({
                            machine_id: params.machine_id,
                            operation_template_id: newOperation_template
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldOperationTemplates.forEach(oldOperationTemplates => {
                    if (params.operation_templates.indexOf(oldOperationTemplates) == -1) {

                        this.db['machine_operation_templates'].destroy(
                            {
                                where: {
                                    machine_id: params.machine_id,
                                    operation_template_id: oldOperationTemplates
                                }
                            }).then(res => {
                        })
                    }
                })
            }
            res.send(oldOperationTemplates)
        })
    }

    getOperationTemplate(req, res, next) {
        this.db['machine_operation_templates'].findAll({
            where: {
                machine_id: req.params.machine_id
            }
        }).then(data => {
            res.send({
                success: true,
                data: data
            })
        })
    }


    // getOperationList(req, res, next) {
    //     let _this = this;
    //     let usersession_id = req.query.usersession_id;
    //     if ((usersession_id == null) || (usersession_id == '')) {
    //         res.send({
    //             success: false,
    //             data: null,
    //             messages: [
    //                 {
    //                     userMessage: 'User session does not exists',
    //                     internalMessage: 'User session does not exists',
    //                     code: 1008
    //                 }
    //             ]
    //         });
    //         return;
    //     }
    //     _this.db['usersessions'].findOne({
    //         where: {
    //             usersession_id: usersession_id,
    //             active: 'Y',
    //             time_out: null
    //
    //         }
    //     })
    //         .then(usersessions => {
    //
    //
    //             if (usersessions) {
    //                 _this.db['boxes'].findOne({
    //                     where: {
    //                         box_id: usersessions.box_id,
    //                         active: 'Y'
    //                     }
    //                 }).then(boxes => {
    //
    //                             if (boxes) {
    //                                 _this.db['machines'].findOne({
    //                                     where: {
    //                                         machine_id: boxes.machine_id,
    //                                         active: 'Y'
    //                                     }
    //                                 }).then(machines => {
    //                                         if (machines) {
    //
    //                                             _this.db['machine_operation_templates'].findAll({
    //                                                 where: {
    //                                                     machine_id: machines.machine_id,
    //                                                     active: 'Y'
    //                                                 },
    //                                                 include : [
    //                                                     {
    //                                                         model : _this.db['operation_templates']
    //                                                     },
    //                                                     {
    //                                                         model : _this.db['machines']
    //                                                     }
    //                                                 ]
    //                                             }).then(machine_operation_templates => {
    //
    //
    //                                                 if(machine_operation_templates.length > 0 ){
    //
    //
    //                                                   var promise1 = new Promise(function (resolve, reject) {
    //
    //                                                       var cpo_result = []
    //                                                       machine_operation_templates.forEach(machine_operation_template_item => {
    //
    //                                                           _this.db['cart_pending_operations'].findAll({
    //                                                               where: {
    //                                                                   '$operation.machine_type_id$': machines.machine_type_id,
    //                                                                   finished: 0,
    //                                                                   active: 'Y',
    //                                                                   '$operation.op_code$': machine_operation_template_item.operation_template.op_code
    //                                                               },
    //                                                               include: [
    //                                                                   {
    //                                                                       model: _this.db['operations'],
    //
    //                                                                   },
    //                                                                   {
    //                                                                       model: _this.db['bundles'],
    //                                                                       include: [{
    //                                                                           model: _this.db['orders']
    //                                                                       }]
    //                                                                   }
    //
    //                                                               ],
    //                                                               order: [
    //                                                                   ['bundle_id', 'ASC']
    //                                                               ]
    //                                                           }).then(cartPendingOperations => {
    //
    //
    //                                                               var promise2 = new Promise(function (resolve, reject) {
    //                                                                   cartPendingOperations.forEach(cpo_item => {
    //
    //                                                                           cpo_result.push(cpo_item)
    //
    //                                                                       setTimeout(resolve, 100, cpo_result);
    //
    //                                                                   })
    //                                                               })
    //                                                               })
    //
    //                                                           setTimeout(resolve, 100, cpo_result);
    //                                                       })
    //
    //                                                   })
    //
    //                                                     Promise.all([promise1]).then(function (cpo_result) {
    //                                                         _this.generateSequenceOperation(cpo_result[0]).then(c => {
    //                                                             res.send({
    //                                                                 success: true,
    //                                                                 data: c,
    //                                                                 status: 200
    //                                                             });
    //                                                         })
    //                                                     })
    //
    //                                                 }else {
    //
    //                                                     _this.db['cart_pending_operations'].findAll({
    //                                                         where: {
    //                                                             '$operation.machine_type_id$': machines.machine_type_id,
    //                                                             finished: 0,
    //                                                             active: 'Y',
    //                                                         },
    //                                                         include: [
    //                                                             {
    //                                                                 model: _this.db['operations'],
    //
    //                                                             },
    //                                                             {
    //                                                                 model: _this.db['bundles'],
    //                                                                 include: [{
    //                                                                     model: _this.db['orders']
    //                                                                 }]
    //                                                             }
    //
    //                                                         ],
    //                                                         order: [
    //                                                             ['bundle_id', 'ASC']
    //                                                         ]
    //                                                     }).then(cartPendingOperations => {
    //
    //                                                         _this.generateSequenceOperation(cartPendingOperations).then(c => {
    //
    //                                                             res.send({
    //                                                                 success: true,
    //                                                                 data: c,
    //                                                                 status: 200
    //                                                             });
    //                                                         })
    //
    //                                                     })
    //                                                 }
    //
    //                                             })
    //
    //                                         } else {
    //                                             res.json({
    //                                                 success: false,
    //                                                 data: null,
    //                                                 userMessage: "Machine not exist",
    //                                                 attributes: [],
    //                                                 status: 500
    //                                             });
    //                                         }
    //
    //                                     })
    //                             } else {
    //                                 res.json({
    //                                     success: false,
    //                                     data: null,
    //                                     userMessage: "Box not exist",
    //                                     attributes: [],
    //                                     status: 500
    //                                 });
    //                             }
    //                         }
    //                     ).catch(err =>
    //                     res.status(500).json(err)
    //                 )
    //             } else {
    //                 res.json({
    //                     success: false,
    //                     data: null,
    //                     userMessage: "Usersession not exist",
    //                     attributes: [],
    //                     status: 500
    //                 });
    //             }
    //
    //         })
    //
    // }

    getOperationList(req, res, next) {
        let _this = this;
        let usersession_id = req.query.usersession_id;
        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'User session does not exists',
                        internalMessage: 'User session does not exists',
                        code: 1008
                    }
                ]
            });
            return;
        }
        _this.db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id,
                active: 'Y',
                time_out: null

            }
        }).then(usersessions => {

            if (usersessions) {
                _this.db['boxes'].findOne({
                    where: {
                        box_id: usersessions.box_id,
                        active: 'Y'
                    }
                }).then(boxes => {

                        if (boxes) {
                            _this.db['machines'].findOne({
                                where: {
                                    machine_id: boxes.machine_id,
                                    active: 'Y'
                                }
                            }).then(machines => {
                                if (machines) {
                                    _this.db['machine_operation_templates'].findAll({
                                        where: {
                                            machine_id: machines.machine_id,
                                            active: 'Y'
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
                                        if (machine_operation_templates.length > 0) {
                                            var promise1 = new Promise(function (resolve, reject) {
                                                var cpo_result = []
                                                let i = 0 ;
                                                machine_operation_templates.forEach(machine_operation_template_item => {
                                                    _this.db['cart_pending_operations'].findOne({
                                                        where: {
                                                            '$operation.machine_type_id$': machines.machine_type_id,
                                                            finished: 0,
                                                            active: 'Y',
                                                            '$operation.op_code$': machine_operation_template_item.operation_template.op_code,
                                                            in_progress: 'N',
                                                        },
                                                        include: [
                                                            {
                                                                model: _this.db['operations'],
                                                                include: [
                                                                    {
                                                                        model: _this.db['bundles'],
                                                                        include: [{
                                                                            model: _this.db['orders']
                                                                        }]
                                                                    }
                                                                ]
                                                            },

                                                        ],
                                                        order: [
                                                            ['bundle_id', 'ASC']
                                                        ]
                                                    }).then(cartPendingOperations => {

                                                        if (cartPendingOperations) {
                                                            cpo_result.push(cartPendingOperations)
                                                        }
                                                        if (i === machine_operation_templates.length -1 ) {
                                                            resolve(cpo_result)
                                                        }
                                                        i++
                                                    })
                                                    // setTimeout(resolve, 1000, cpo_result);
                                                })
                                            })
                                            Promise.all([promise1]).then(function (cpo_result) {
                                                _this.generateSequenceOperation(cpo_result[0]).then(c => {
                                                    let cpo = c.sort(_this.dynamicSort('cart_pending_operation_id'))
                                                    res.send({
                                                        success: true,
                                                        data: cpo,
                                                        status: 200
                                                    });
                                                })
                                            })
                                        } else {
                                            _this.db['operation_templates'].findAll({
                                                where: {
                                                    machine_type_id: machines.machine_type_id,
                                                    active: 'Y'
                                                }
                                            }).then(operation_templates => {
                                                if (operation_templates.length > 0) {
                                                    var promise1 = new Promise(function (resolve, reject) {
                                                        let i = 0 ;
                                                        var cpo_result = []
                                                        operation_templates.forEach(operation_template_item => {
                                                            _this.db['cart_pending_operations'].findOne({
                                                                where: {
                                                                    //'$operation.machine_type_id$': operation_templates.machine_type_id,
                                                                    finished: 0,
                                                                    active: 'Y',
                                                                    in_progress: 'N',
                                                                    '$operation.op_code$': operation_template_item.op_code,
                                                                },
                                                                include: [
                                                                    {
                                                                        model: _this.db['operations'],
                                                                        include: [
                                                                            {
                                                                                model: _this.db['bundles'],
                                                                                include: [{
                                                                                    model: _this.db['orders']
                                                                                }]
                                                                            }
                                                                        ]
                                                                    },
                                                                ],
                                                                order: [
                                                                    ['bundle_id', 'ASC']
                                                                ]
                                                            }).then(cartPendingOperations => {
                                                                if (cartPendingOperations) {
                                                                    cpo_result.push(cartPendingOperations)
                                                                }
                                                                if (i === operation_templates.length -1 ) {
                                                                    resolve(cpo_result)
                                                                }
                                                                i++
                                                            })

                                                            // setTimeout(resolve, 100, cpo_result);

                                                        })
                                                    })
                                                    Promise.all([promise1]).then(function (cpo_result) {
                                                        _this.generateSequenceOperation(cpo_result[0]).then(c => {

                                                            let cpo = c.sort(_this.dynamicSort('cart_pending_operation_id'))
                                                            res.send({
                                                                success: true,
                                                                data: cpo,
                                                                status: 200
                                                            });
                                                        })
                                                    })
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        data: null,
                                                        userMessage: "Operation Template not exist",
                                                        attributes: [],
                                                        status: 500
                                                    });
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        userMessage: "Machine not exist",
                                        attributes: [],
                                        status: 500
                                    });
                                }
                            })
                        } else {
                            res.json({
                                success: false,
                                data: null,
                                userMessage: "Box not exist",
                                attributes: [],
                                status: 500
                            });
                        }
                    }
                ).catch(err =>
                    res.status(500).json(err)
                )
            } else {
                res.json({
                    success: false,
                    data: null,
                    userMessage: "Usersession not exist",
                    attributes: [],
                    status: 500
                });
            }

        })

    }


    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    generateSequenceOperation(cartPendingOperations) {


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
                order: [
                    ['sequence_order', 'ASC']
                ]
            }).then(operationSequences => {


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

// get operationList + pagination
//     getOperationList_others(req, res, next) {
//         let _this = this;
//         let usersession_id = req.body.usersession_id;
//         let limit = req.body.limit;
//         let page = req.body.page
//         let op_code = req.body.op_code;
//
//         if ((limit == null) || (limit == '')) {
//             limit = 3
//         }
//
//         if ((page == null) || (page == '')) {
//             res.send({
//                 success: false,
//                 data: null,
//                 messages: [
//                     {
//                         userMessage: 'Page not provided',
//                         internalMessage: 'Page not provided',
//                     }
//                 ]
//             });
//             return;
//         }
//         if ((usersession_id == null) || (usersession_id == '')) {
//             res.send({
//                 success: false,
//                 data: null,
//                 messages: [
//                     {
//                         userMessage: 'User session does not exists',
//                         internalMessage: 'User session does not exists',
//                         code: 1008
//                     }
//                 ]
//             });
//             return;
//         }
//
//         if ((op_code == null) || (op_code == '')) {
//             res.send({
//                 success: false,
//                 data: null,
//                 messages: [
//                     {
//                         userMessage: 'Operation Code not provided',
//                         internalMessage: 'Operation Code not provided'
//                     }
//                 ]
//             });
//             return;
//         }
//         _this.db['usersessions'].findOne({
//             where: {
//                 usersession_id: usersession_id,
//                 active: 'Y',
//                 time_out: null
//
//             }
//         }).then(usersessions => {
//
//             if (usersessions) {
//                 _this.db['boxes'].findOne({
//                     where: {
//                         box_id: usersessions.box_id,
//                         active: 'Y'
//                     }
//                 }).then(boxes => {
//
//                     if (boxes) {
//                         _this.db['machines'].findOne({
//                             where: {
//                                 machine_id: boxes.machine_id,
//                                 active: 'Y'
//                             }
//                         }).then(machines => {
//                             if (machines) {
//
//                                 let offset = 0;
//                                 _this.db['cart_pending_operations'].findAndCountAll({
//                                     where: {
//                                         '$operation.machine_type_id$': machines.machine_type_id,
//                                         finished: 0,
//                                         active: 'Y',
//                                         '$operation.op_code$': op_code,
//                                         in_progress: 'N',
//                                     },
//                                     include: [
//                                         {
//                                             model: _this.db['operations'],
//                                             include: [
//                                                 {
//                                                     model: _this.db['bundles'],
//                                                     include: [{
//                                                         model: _this.db['orders']
//                                                     }]
//                                                 }
//                                             ],
//
//                                         },
//
//                                     ],
//                                     order: [
//                                         ['bundle_id', 'ASC']
//                                     ],
//                                     offset: 1
//                                 }).then(data => {
//
//
//                                     let pages = Math.ceil(data.count / limit);
//                                     offset = limit * (page - 1);
//
//                                     _this.db['cart_pending_operations'].findAll({
//                                         where: {
//                                             '$operation.machine_type_id$': machines.machine_type_id,
//                                             finished: 0,
//                                             active: 'Y',
//                                             '$operation.op_code$': op_code,
//                                             in_progress: 'N',
//                                         },
//                                         include: [
//                                             {
//                                                 model: _this.db['operations'],
//                                                 include: [
//                                                     {
//                                                         model: _this.db['bundles'],
//                                                         include: [{
//                                                             model: _this.db['orders']
//                                                         }]
//                                                     }
//                                                 ],
//
//                                             },
//
//                                         ],
//                                         order: [
//                                             ['bundle_id', 'ASC']
//                                         ],
//                                         limit: limit,
//                                         offset: offset,
//                                     }).then(cartPendingOperations => {
//
//                                         _this.generateSequenceOperation(cartPendingOperations).then(c => {
//                                             res.send({
//                                                 success: true,
//                                                 totalPage: pages,
//                                                 data: c,
//                                                 status: 200
//                                             });
//                                         })
//
//                                     })
//                                 })
//
//
//
//                             } else {
//
//                                 res.json({
//                                     success: false,
//                                     data: null,
//                                     userMessage: "Machine does not exist",
//                                     attributes: [],
//                                     status: 500
//                                 });
//
//                             }
//
//                         })
//                     } else {
//
//                         res.json({
//                             success: false,
//                             data: null,
//                             userMessage: "Box does not exist",
//                             attributes: [],
//                             status: 500
//                         });
//
//                     }
//
//                 })
//
//             } else {
//                 res.send({
//                     success: false,
//                     data: null,
//                     messages: [{
//                         userMessage: 'User session does not exists',
//                         internalMessage: 'User session does not exists',
//                         code: 1008
//                     }]
//                 });
//                 return;
//             }
//
//         })
//
//     }

// get operationList sans pagination
    getOperationList_others(req, res, next) {
        let _this = this;
        let usersession_id = req.body.usersession_id;
        let op_code = req.body.op_code;
        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'User session does not exists',
                        internalMessage: 'User session does not exists',
                        code: 1008
                    }
                ]
            });
            return;
        }

        if ((op_code == null) || (op_code == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Operation Code not provided',
                        internalMessage: 'Operation Code not provided'
                    }
                ]
            });
            return;
        }
        _this.db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id,
                active: 'Y',
                time_out: null

            }
        }).then(usersessions => {

            if (usersessions) {
                _this.db['boxes'].findOne({
                    where: {
                        box_id: usersessions.box_id,
                        active: 'Y'
                    }
                }).then(boxes => {

                    if (boxes) {
                        _this.db['machines'].findOne({
                            where: {
                                machine_id: boxes.machine_id,
                                active: 'Y'
                            }
                        }).then(machines => {
                            if (machines) {

                                _this.db['cart_pending_operations'].findAll({
                                    where: {
                                        '$operation.machine_type_id$': machines.machine_type_id,
                                        finished: 0,
                                        active: 'Y',
                                        '$operation.op_code$': op_code,
                                        in_progress: 'N',
                                    },
                                    include: [
                                        {
                                            model: _this.db['operations'],
                                            include: [
                                                {
                                                    model: _this.db['bundles'],
                                                    include: [{
                                                        model: _this.db['orders']
                                                    }]
                                                }
                                            ],

                                        },

                                    ],
                                    order: [
                                        ['bundle_id', 'ASC']
                                    ],
                                    offset: 1
                                }).then(cartPendingOperations => {

                                    _this.generateSequenceOperation(cartPendingOperations).then(c => {
                                        res.send({
                                            success: true,
                                            data: c,
                                            status: 200
                                        });
                                    })

                                })

                            } else {

                                res.json({
                                    success: false,
                                    data: null,
                                    userMessage: "Machine does not exist",
                                    attributes: [],
                                    status: 500
                                });

                            }

                        })
                    } else {

                        res.json({
                            success: false,
                            data: null,
                            userMessage: "Box does not exist",
                            attributes: [],
                            status: 500
                        });

                    }

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

module.exports = MachineOperationTemplateDao;
