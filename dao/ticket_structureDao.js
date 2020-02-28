const {
    baseModelDao
} = require('./baseModalDao');

class TicketStructureDao extends baseModelDao {
    constructor() {
        super('ticket_structures', 'id');
        this.baseModal = 'ticket_structures';
        this.primaryKey = 'id';
    }


    openTicket(req, res, next) {
        let _this = this;
        let label = req.body.label;
        var ticket_structures = req.body.ticket_structures;
        _this.db['observations'].findOne({
            where: {
                label: label
            }
        }).then((observations) => {
            if (observations) {
                _this.db['status_tickets'].findOne({
                    where: {
                        label: "open"
                    }
                }).then((status_ticket) => {
                    if (status_ticket) {
                        var ticket_structure = _this.db['ticket_structures'].build(req.body);
                        ticket_structure.subject = req.body.subject;
                        ticket_structure.line_id = req.body.line_id;
                        ticket_structure.department_id = req.body.department_id;
                        ticket_structure.created_at = new Date();
                        ticket_structure.owner_id = req.body.owner_id;
                        ticket_structure.operation_id = req.body.operation_id;
                        ticket_structure.current_status_id = status_ticket.id;
                        ticket_structure.created_by = req.body.created_by;
                        ticket_structure.bundle_id = req.body.bundle_id;
                        ticket_structure.order_id = req.body.order_id;
                        ticket_structure.box_id = req.body.box_id;
                        ticket_structure.source = req.body.source;
                        ticket_structure.priority = req.body.priority;
                        ticket_structure.image_id = req.body.image_id;
                        ticket_structure.observation_id = observations.observation_id;

                        ticket_structure.save().then(ticket_structure => {
                            if (ticket_structure) {
                                var ticket_feed = _this.db['ticket_feeds'].build(req.body);
                                ticket_feed.created_at = new Date();
                                ticket_feed.ticket_id = ticket_structure.id;
                                ticket_feed.comment = ticket_structure.subject;
                                ticket_feed.owner_id = ticket_structure.owner_id;
                                ticket_feed.status_id = ticket_structure.current_status_id;
                                ticket_feed.save().then(ticket_feeds => {
                                    if (ticket_feeds) {
                                        let files = req.body.files;
                                        files.forEach(function (file_id) {

                                            file_id.ticket_feed_id = ticket_feeds.ticket_feed_id;
                                            file_id.created_at = new Date();

                                            var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
                                            ticket_feed_attachments.save().then(function (ticket_attachment) {

                                            })
                                        });

                                        res.json({
                                            success: true,
                                            messages: [{
                                                userMessage: "Ticket Structure created with success",
                                                internalMessage: 'Ticket_structure created with success',
                                                code: 8000,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                            }],
                                            attributes: [],
                                            status: 200
                                        });
                                    } else {
                                        res.json({
                                            success: false,
                                            data: null,
                                            messages: [{
                                                userMessage: "Ticket Feed not created",
                                                internalMessage: 'Ticket Feed not created',
                                                code: 8001,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
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
                                        userMessage: "Ticket Structure not created",
                                        internalMessage: 'Ticket_structure not created',
                                        code: 8001,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
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
                                userMessage: "Status Ticket not exists",
                                internalMessage: 'Status Ticket not exists',
                                code: 8001,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
                            }],
                            attributes: [],
                            status: 500
                        });
                    }


                })
            } else {
                var observations = _this.db['observations'].build(req.body);
                observations.created_at = new Date();
                observations.finished = 'N';

                observations.save().then(observation => {
                    if (observation) {
                        _this.db['status_tickets'].findOne({
                            where: {
                                label: "open"
                            }
                        }).then((status_ticket) => {
                            if (status_ticket) {
                                var ticket_structure = _this.db['ticket_structures'].build(req.body);
                                ticket_structure.subject = req.body.subject;
                                ticket_structure.line_id = req.body.line_id;
                                ticket_structure.department_id = req.body.department_id;
                                ticket_structure.created_at = new Date();
                                ticket_structure.owner_id = req.body.owner_id;
                                ticket_structure.operation_id = req.body.operation_id;
                                ticket_structure.current_status_id = status_ticket.id;
                                ticket_structure.created_by = req.body.created_by;
                                ticket_structure.bundle_id = req.body.bundle_id;
                                ticket_structure.order_id = req.body.order_id;
                                ticket_structure.box_id = req.body.box_id;
                                ticket_structure.source = req.body.source;
                                ticket_structure.priority = req.body.priority;
                                ticket_structure.image_id = req.body.image_id;
                                ticket_structure.observation_id = observation.observation_id;

                                ticket_structure.save().then(ticket_structure => {
                                    if (ticket_structure) {
                                        var ticket_feed = _this.db['ticket_feeds'].build(req.body);
                                        ticket_feed.created_at = new Date();
                                        ticket_feed.ticket_id = ticket_structure.id;
                                        ticket_feed.comment = ticket_structure.subject;
                                        ticket_feed.owner_id = ticket_structure.owner_id;
                                        ticket_feed.status_id = ticket_structure.current_status_id;
                                        ticket_feed.save().then(ticket_feeds => {
                                            if (ticket_feeds) {
                                                let files = req.body.files;
                                                files.forEach(function (file_id) {

                                                    file_id.ticket_feed_id = ticket_feeds.ticket_feed_id;
                                                    file_id.created_at = new Date();

                                                    var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
                                                    ticket_feed_attachments.save().then(function (ticket_attachment) {

                                                    })
                                                });

                                                res.json({
                                                    success: true,
                                                    messages: [{
                                                        userMessage: "Ticket Structure created with success",
                                                        internalMessage: 'Ticket_structure created with success',
                                                        code: 8000,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                                    }],
                                                    attributes: [],
                                                    status: 200
                                                });
                                            } else {
                                                res.json({
                                                    success: false,
                                                    data: null,
                                                    messages: [{
                                                        userMessage: "Ticket Feed not created",
                                                        internalMessage: 'Ticket Feed not created',
                                                        code: 8001,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
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
                                                userMessage: "Ticket Structure not created",
                                                internalMessage: 'Ticket_structure not created',
                                                code: 8001,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
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
                                        userMessage: "Status Ticket not exists",
                                        internalMessage: 'Status Ticket not exists',
                                        code: 8001,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
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
                                userMessage: "Observation Info not exists",
                                internalMessage: 'Observation Info not exists',
                                code: 8004,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8008"
                            }],
                            attributes: [],
                            status: 500
                        });
                    }
                })

            }

        })

    }

    insert_ticket(req, res, next) {
        let _this = this;
        _this.db['status_tickets'].findOne({
            where: {
                label: "open"
            }
        }).then((status_ticket) => {
            if (status_ticket) {
                var ticket_structure = _this.db['ticket_structures'].build(req.body);
                ticket_structure.subject = req.body.subject;
                ticket_structure.line_id = req.body.line_id;
                ticket_structure.department_id = req.body.department_id;
                ticket_structure.created_at = req.body.created_at;
                ticket_structure.owner_id = req.body.owner_id;
                ticket_structure.operation_id = req.body.operation_id;
                ticket_structure.current_status_id = status_ticket.id;
                ticket_structure.created_by = req.body.created_by;
                ticket_structure.bundle_id = req.body.bundle_id;
                ticket_structure.order_id = req.body.order_id;
                ticket_structure.box_id = req.body.box_id;
                ticket_structure.source = req.body.source;
                ticket_structure.id_priority = req.body.id_priority;
                ticket_structure.image_id = req.body.image_id;
                ticket_structure.observation_id = req.body.observation_id;
                ticket_structure.save().then(ticket_structures => {
                    if (ticket_structures) {
                        var ticket_feed = _this.db['ticket_feeds'].build(req.body);
                        ticket_feed.ticket_id = ticket_structure.id;
                        ticket_feed.comment = ticket_structure.subject;
                        ticket_feed.status_id = status_ticket.id;
                        ticket_feed.save().then(ticket_feeds => {
                            if (ticket_feeds) {
                                var ticket_feed_attachment = _this.db['ticket_feed_attachments'].build(req.body);
                                ticket_feed_attachment.ticket_feed_id = ticket_feed.ticket_feed_id;
                                ticket_feed_attachment.file_id = ticket_structure.image_id;
                                ticket_feed_attachment.save().then(ticket_feed_attachments => {
                                    if (ticket_feed_attachments) {
                                        res.json({
                                            success: true,
                                            data: {
                                                ticket_structures: ticket_structures,
                                                ticket_feeds: ticket_feeds,
                                                ticket_feed_attachments: ticket_feed_attachments,

                                            },
                                            messages: [{
                                                userMessage: "Ticket Structure created with success",
                                                internalMessage: 'Ticket_structure created with success',
                                                code: 8000,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                            }],
                                            attributes: [],
                                            status: 200
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            data: {
                                                ticket_structures: ticket_structures,
                                                ticket_feeds: ticket_feeds
                                            },
                                            messages: [{
                                                userMessage: "Ticket Structure created with success",
                                                internalMessage: 'Ticket_structure created with success',
                                                code: 8000,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                            }],
                                            attributes: [],
                                            status: 200
                                        });
                                    }
                                })
                            } else {
                                res.json({
                                    success: true,
                                    data: ticket_structures,
                                    messages: [{
                                        userMessage: "Ticket Structure created with success",
                                        internalMessage: 'Ticket_structure created with success',
                                        code: 8000,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            }
                        })


                    } else {
                        res.json({
                            success: false,
                            data: null,
                            messages: [{
                                userMessage: "Ticket Structure not created",
                                internalMessage: 'Ticket_structure not created',
                                code: 8001,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
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
                        userMessage: "Status Ticket not exists",
                        internalMessage: 'Status Ticket not exists',
                        code: 8001,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })
    }


    saveTicketStructure(ticket_structures1, observation, status_ticket) {
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {

            if (ticket_structures1.length === 0) {
                resolve('ok')
            }

            ticket_structures1.forEach(function (ticket_structure) {

                ticket_structure.created_at = new Date();
                ticket_structure.current_status_id = status_ticket.id;
                ticket_structure.observation_id = observation.observation_id;
                ticket_structure.line_id = observation.line_id

                var ticket_structures = _this.db['ticket_structures'].build(ticket_structure)
                ticket_structures.save().then(function (ticket_structure_saved) {

                    ticket_structure.status_id = status_ticket.id;
                    ticket_structure.comment = ticket_structure_saved.subject;
                    ticket_structure.ticket_id = ticket_structure_saved.id;
                    ticket_structure.created_at = new Date();
                    var ticket_feeds = _this.db['ticket_feeds'].build(ticket_structure);
                    ticket_feeds.owner_id = ticket_structure.owner_id
                    ticket_feeds.save().then(function (ticket_feed_saved) {
                        let files = ticket_structure.files;

                        if (i === 0 && ticket_structure.files && ticket_structure.files.length > 0) {
                            _this.save_ticket_feed_attachments(files, ticket_feed_saved, ticket_structure).then(files_saved => {
                                if (i === ticket_structures1.length - 1) {
                                    resolve(ticket_structures)
                                    return;
                                }
                            })
                        }

                        if (i === ticket_structures1.length - 1) {
                            resolve(ticket_structures)
                            return;
                        }
                        i++
                    })

                })
            })
        })
    }

    save_ticket_feed_attachments(files, ticket_feed_saved, ticket_structure) {
        let _this = this;
        let i = 0
        return new Promise(function (resolve, reject) {

            if (files.length === 0) {
                resolve(files);
                return
            }
            files.forEach(function (file_id) {

                ticket_structure.file_id = ticket_feed_saved.image_id;
                file_id.ticket_feed_id = ticket_feed_saved.ticket_feed_id;
                file_id.created_at = new Date();

                var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
                ticket_feed_attachments.save().then(ticket_attachment => {
                    if (i === files.length - 1) {
                        console.log('resooolve saveTicketFeed_attachement')
                        resolve(files);
                        return
                    }
                    i++
                })
            })
        })
    }

    multiOpen(req, res, next) {
        let _this = this;

        var ticket_structures = req.body.ticket_structures;


        var label = req.body.label;

        _this.db['status_tickets'].findOne({
            where: {
                code: "open"
            }
        }).then((status_ticket) => {

            if (status_ticket) {

                _this.db['observations'].findOne({
                    where: {
                        label: label
                    }
                }).then(observations => {

                    if (!observations) {
                        let observation = {}
                        observation.created_at = new Date();
                        observation.finished = 'N';
                        observation.label = label;
                        observation.line_id = req.body.line_id;
                        var modalObj = _this.db['observations'].build(observation);
                        modalObj.save().then(function (saved_observation) {

                            _this.saveTicketStructure(ticket_structures, saved_observation, status_ticket).then(saved_ticket_structure => {
                                res.json({
                                    success: true,
                                    // data: {
                                    //     ticket_structures: saved_ticket_structure,
                                    // },
                                    messages: [{
                                        userMessage: "Ticket Structure created with success",
                                        internalMessage: 'Ticket_structure created with success',
                                        code: 8000,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            })
                        })
                    } else {

                        _this.saveTicketStructure(ticket_structures, observations, status_ticket).then(saved_ticket_structure => {
                            res.json({
                                success: true,
                                // data: {
                                //     ticket_structures: saved_ticket_structure,
                                // },
                                messages: [{
                                    userMessage: "Ticket Structure created with success",
                                    internalMessage: 'Ticket_structure created with success',
                                    code: 8000,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
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
                        userMessage: "Status Ticket not exists",
                        internalMessage: 'Status Ticket not exists',
                        code: 8005,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })


        // _this.db['observations'].findOne({
        //     where: {
        //         label: label
        //     }
        // }).then((observations) => {
        //     if (!observations) {
        //         var observation1 = _this.db['observations'].build(observations);
        //         observation1.created_at = new Date();
        //         observation1.finished = 'N';
        //         observation1.label = label;
        //         observation1.line_id = req.body.line_id;
        //         observation1.save().then(function (observation) {
        //             _this.db['status_tickets'].findOne({
        //                 where: {
        //                     code: "open"
        //                 }
        //             }).then((status_ticket) => {
        //                 if (status_ticket) {

        //                     // --------------------------------------------- here
        //                     ticket_structures.forEach(function (ticket_structure) {

        //                         ticket_structure.created_at = new Date();
        //                         ticket_structure.current_status_id = status_ticket.id;
        //                         ticket_structure.observation_id = observation.observation_id;

        //                         var ticket_structures = _this.db['ticket_structures'].build(ticket_structure);

        //                         ticket_structures.save().then(function (ticket_structure1) {
        //                             ticket_structure.status_id = status_ticket.id;
        //                             ticket_structure.comment = ticket_structure1.subject;
        //                             ticket_structure.ticket_id = ticket_structure1.id;
        //                             ticket_structure.created_at = new Date();

        //                             var ticket_feeds = _this.db['ticket_feeds'].build(ticket_structure);
        //                             ticket_feeds.owner_id = ticket_structure.owner_id
        //                             ticket_feeds.save().then(function (ticket_structure2) {
        //                                 let files = ticket_structure.files;

        //                                 files.forEach(function (file_id) {

        //                                     ticket_structure.file_id = ticket_structure2.image_id;
        //                                     file_id.ticket_feed_id = ticket_structure2.ticket_feed_id;
        //                                     file_id.created_at = new Date();

        //                                     var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
        //                                     ticket_feed_attachments.save().then(function (ticket_attachment) {})
        //                                 })
        //                             })

        //                         });
        //                     })
        //                 } else {
        //                     res.json({
        //                         success: false,
        //                         data: null,
        //                         messages: [{
        //                             userMessage: "Status Ticket not exists",
        //                             internalMessage: 'Status Ticket not exists',
        //                             code: 8005,
        //                             more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
        //                         }],
        //                         attributes: [],
        //                         status: 500
        //                     });
        //                 }

        //             })

        //         })
        //     } else {
        //         ticket_structures.forEach(function (ticket_structure) {
        //             _this.db['status_tickets'].findOne({
        //                 where: {
        //                     label: "open"
        //                 }
        //             }).then((status_ticket) => {
        //                 if (status_ticket) {
        //                     ticket_structure.created_at = new Date();
        //                     ticket_structure.current_status_id = status_ticket.id;
        //                     ticket_structure.observation_id = observations.observation_id;

        //                     var ticket_structures = _this.db['ticket_structures'].build(ticket_structure);

        //                     ticket_structures.save().then(function (ticket_structure1) {
        //                         ticket_structure.status_id = status_ticket.id;
        //                         ticket_structure.comment = ticket_structure1.subject;
        //                         ticket_structure.ticket_id = ticket_structure1.id;
        //                         ticket_structure.created_at = new Date();

        //                         var ticket_feeds = _this.db['ticket_feeds'].build(ticket_structure);
        //                         ticket_feeds.owner_id = ticket_structure.owner_id
        //                         ticket_feeds.save().then(function (ticket_structure2) {
        //                             let files = ticket_structure.files;

        //                             files.forEach(function (file_id) {

        //                                 ticket_structure.file_id = ticket_structure2.image_id;
        //                                 file_id.ticket_feed_id = ticket_structure2.ticket_feed_id;
        //                                 file_id.created_at = new Date();

        //                                 var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
        //                                 ticket_feed_attachments.save().then(function (ticket_attachment) {})
        //                             })
        //                         })

        //                     });
        //                 } else {
        //                     res.json({
        //                         success: false,
        //                         data: null,
        //                         messages: [{
        //                             userMessage: "Status Ticket not exists",
        //                             internalMessage: 'Status Ticket not exists',
        //                             code: 8005,
        //                             more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8005"
        //                         }],
        //                         attributes: [],
        //                         status: 500
        //                     });
        //                 }

        //             })
        //         })
        //     }
        // })


        // res.json({
        //     success: true,
        //     data: {
        //         ticket_structures: ticket_structures,
        //     },
        //     messages: [{
        //         userMessage: "Ticket Structure created with success",
        //         internalMessage: 'Ticket_structure created with success',
        //         code: 8000,
        //         more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
        //     }],
        //     attributes: [],
        //     status: 200
        // });



    }


    getOperationByLine(req, res, next) {
        let _this = this;
        let line_id = req.params.line_id;
        _this.db['machines'].findOne({
            where: {
                line_id: line_id
            }
        }).then((machines) => {
            if (machines) {
                _this.db['operations'].findAll({
                    include: [{
                            model: _this.db['bundles']
                        },
                        {
                            model: _this.db['machine_types']
                        },
                        {
                            model: _this.db['machine_groups']
                        },
                        {
                            model: _this.db['lines']
                        }
                    ],
                    where: {
                        machine_type_id: machines.machine_type_id,
                        line_id: machines.line_id
                    }
                }).then((operations) => {
                    if (operations) {
                        res.send({
                            success: true,
                            data: operations,
                            messages: [{
                                message: 'Operations By Line with success',
                                internalMessage: 'Operations By Line with success',
                                code: 4008,
                            }],
                            attributes: [],
                            status: 200
                        });
                    } else {
                        res.send({
                            success: false,
                            data: null,
                            messages: [{
                                message: 'Operations Not exist',
                                internalMessage: 'Operation Templates Not exist',
                                code: 6002,
                            }],
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
                        message: 'Machine Group Not exist',
                        internalMessage: 'Machine Group Not exist',
                        code: 6002,
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })

    }

    findTicketFeedById(req, res, next) {
        let _this = this;
        let ticket_id = req.params.ticket_id;
        _this.db['ticket_structures'].findOne({
                where: {
                    id: ticket_id
                }
            })
            .then(ticket_structures => {
                _this.db['ticket_feeds'].findAll({
                        include: [{
                                model: _this.db['users'],
                                as: 'createdBy'
                            },
                            {
                                model: _this.db['ticket_structures'],
                            },
                            {
                                model: _this.db['jobs'],
                            },
                            {
                                model: _this.db['users'],
                                as: 'owner'
                            },
                        ],
                        where: {
                            ticket_id: ticket_structures.id,
                            active: 'Y'
                        }
                    })
                    .then(ticket_feeds => {
                        if (ticket_feeds) {
                            res.json({
                                success: true,
                                data: ticket_feeds,
                                messages: [{
                                    userMessage: "Ticket Feed Info with success",
                                    internalMessage: 'Ticket Feed Info with success',
                                    code: 8003,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8003"
                                }],
                                attributes: [],
                                status: 200
                            });
                        } else {
                            res.json({
                                success: false,
                                data: null,
                                messages: [{
                                    userMessage: "Ticket Feed Info not exists",
                                    internalMessage: 'Ticket Feed Info not exists',
                                    code: 8004,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8004"
                                }],
                                attributes: [],
                                status: 500
                            });
                        }

                    })
            }).catch(err =>
                res.status(500).json(err)
            )
    }


    getTicketByLine(req, res, next) {
        let _this = this;
        let line_id = req.params.line_id;
        _this.db['lines'].findOne({
            where: {
                line_id: line_id,
                active: 'Y'
            }
        }).then((lines) => {
            if (lines) {
                let limit = (req.query.limit) ? req.query.limit : 10;
                let page = (req.query.page) ? req.query.page : 1;
                let offset = 0;
                _this.db['ticket_structures'].findAndCountAll().then((data) => {
                    let pages;
                    // if(limit){
                    pages = Math.ceil(data.count / limit);
                    offset = limit * (page - 1);
                    // }else {
                    //     let limit = 10; // number of records per page
                    //
                    //     pages = Math.ceil(data.count / limit);
                    //     offset = limit * (page - 1);
                    // }


                    _this.db['ticket_structures'].findAll({
                        include: [{
                                model: _this.db['lines']
                            },
                            {
                                model: _this.db['jobs']
                            },
                            {
                                model: _this.db['operation_templates']
                            },
                            {
                                model: _this.db['observations']
                            },
                            {
                                model: _this.db['status_tickets']
                            },
                            {
                                model: _this.db['users']
                            },
                            {
                                model: _this.db['bundles']
                            },
                            {
                                model: _this.db['orders']
                            },
                            {
                                model: _this.db['boxes']
                            },
                            {
                                model: _this.db['priorities']
                            },

                        ],
                        limit: limit,
                        offset: offset,
                        $sort: {
                            id: 1
                        },
                        order: [
                            ['created_at', 'DESC']
                        ],
                        where: {
                            line_id: lines.line_id,
                            active: 'Y'
                        }
                    }).then((ticket_structures) => {
                        if (ticket_structures) {
                            console.log('ticket structures', ticket_structures.length)

                            _this.allTicketFeed(ticket_structures).then(ticket_feeds => {
                                // console.log('result promise', ticket_feeds)

                                res.send({
                                    success: true,
                                    data: ticket_feeds,
                                    messages: [{
                                        message: 'Ticket Structure By Line with success',
                                        internalMessage: 'Ticket Structure By Line with success',
                                        code: 4008,
                                    }],
                                    attributes: [{
                                        Total: data.count,
                                        totalPage: pages
                                    }],
                                    status: 200
                                });

                            })

                        } else {
                            res.send({
                                success: false,
                                data: null,
                                messages: [{
                                    message: 'Ticket Structure Not exist',
                                    internalMessage: 'Ticket Structure Templates Not exist',
                                    code: 6002,
                                }],
                                attributes: [],
                                status: 500
                            });
                        }
                    })
                })
            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        message: 'Line Not exist',
                        internalMessage: 'Line Not exist',
                        code: 6002,
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })

    }
    allTicketFeed(ticket_structures) {

        let _this = this;

        return new Promise(function (resolve, reject) {

            // console.log('1')
            let i = 0;
            // console.log('lenngth ticket_structures', ticket_structures.length)
            if (ticket_structures.length === 0) {
                resolve([]);
            }

            ticket_structures.forEach(function (ticket_structure) {

                _this.db['ticket_feeds'].findAll({
                    where: {
                        ticket_id: ticket_structure.id
                    },
                    order: [
                        ['created_at', 'DESC']
                    ]
                }).then(ticket_feed => {
                    _this.allFile(ticket_feed).then(ticket_feeds => {
                        // console.log('allfile  i =', i)

                        ticket_structure.ticket_feeds = [];
                        ticket_structure.ticket_feeds = ticket_feeds;
                        i++;
                        if (i === ticket_structures.length) {
                            resolve(ticket_structures);
                            console.log('ticket_structures******************', ticket_feeds.length)
                        }
                    })




                })

            })
        })
    }

    allFile(ticket_feeds) {

        let _this = this;

        return new Promise(function (resolve, reject) {
            let i = 0;
            let allFilesGeted = 0;

            if (ticket_feeds.length === 0) {
                resolve([])
            }

            ticket_feeds.forEach(function (ticket_feed) {
                ticket_feed.ticket_feed_attachments = [];

                _this.db['ticket_feed_attachments'].findAll({
                    where: {
                        ticket_feed_id: ticket_feed.ticket_feed_id
                    }
                }).then(ticket_feed_attachment => {
                    allFilesGeted++;
                    ticket_feed.ticket_feed_attachments = ticket_feed_attachment;

                    if (allFilesGeted >= ticket_feeds.length) {
                        resolve(ticket_feeds);
                    }

                });

                i++;
            })
        })
    }


    getTicketFeedAttachment(ticket_feeds) {

        let _this = this;

        return new Promise(function (resolve, reject) {
            let i = 0;

            ticket_feeds.forEach(function (ticket_feed) {

                _this.db['ticket_feed_attachments'].findAll({
                    include: [{
                        model: _this.db['efiles']
                    }],
                    where: {
                        ticket_feed_id: ticket_feed.ticket_feed_id
                    }
                }).then(ticket_feed_attachment1 => {

                    ticket_feed.ticket_feed_attachments = []
                    ticket_feed.ticket_feed_attachments = ticket_feed_attachment1;

                    i++;

                    if (i === ticket_feeds.length) {
                        resolve(ticket_feeds);
                    }

                })


            })
        })


    }

    getTicketFeedByTicket(req, res, next) {
        let _this = this;
        let ticket_id = req.params.ticket_id;
        _this.db['ticket_structures'].findOne({
            where: {
                id: ticket_id,
                active: 'Y'
            }
        }).then((ticket_structures) => {
            if (ticket_structures) {
                _this.db['ticket_feeds'].findAll({
                    include: [{
                            model: _this.db['users'],
                            as: 'createdBy',
                            require: false
                        },
                        {
                            model: _this.db['jobs'],
                            require: false
                        },
                        {
                            model: _this.db['users'],
                            as: 'owner',
                            require: false
                        }

                    ],
                    where: {
                        ticket_id: ticket_structures.id,
                        active: 'Y'
                    }
                }).then((ticket_feeds) => {
                    if (ticket_feeds) {
                        _this.getTicketFeedAttachment(ticket_feeds).then(ticket_feed_attachment2 => {
                            res.json({
                                success: true,
                                data: ticket_feed_attachment2,
                                messages: [{
                                    userMessage: "Ticket Feed with success",
                                    internalMessage: 'Ticket Feed with success',
                                }],
                                attributes: [],
                                status: 200
                            });

                        });
                    } else {
                        res.send({
                            success: false,
                            data: null,
                            messages: [{
                                message: 'Ticket Feed Not exist',
                                internalMessage: 'Ticket Feed Not exist',
                            }],
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
                        message: 'Ticket Structure Not exist',
                        internalMessage: 'Ticket Structure Not exist',
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })

    }


}

module.exports = TicketStructureDao;