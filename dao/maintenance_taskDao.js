const {baseModelDao} = require('./baseModalDao');
var moment = require('moment');

class MaintenanceTaskDao extends baseModelDao {
    constructor() {
        super('maintenance_tasks', 'maintenance_task_id');
        this.baseModal = 'maintenance_tasks';
        this.primaryKey = 'maintenance_task_id';
    }

    addMaintenanceTask(req, res, next) {
        // let params = req.body;

        let usersession_id = req.query.usersession_id;
        let _this = this;

        let departement_id= req.query.departement_id

        if ((departement_id == null) || (departement_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Departement ID not provided',
                        internalMessage: 'Departement ID not provided',
                        code: 1037
                    }
                ]
            });
            return;
        }

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
                usersession_id: usersession_id

            },
            include: [
                {
                    model: _this.db['employees'],
                    include: [
                        {
                            model: _this.db['jobs']
                        }
                    ]
                }
            ]

        }).then(usersession => {


            

            if (usersession) {

                _this.db['boxes'].findOne({
                   where : {
                    box_id: usersession.box_id
                   }  
                }).then(boxes => {
                    
                    if (boxes) {
                        _this.db['machines'].findOne({
                            where: {
                                machine_id: boxes.machine_id
                            }
                        }).then(machines => {
                            if (machines) {
                              
                                var date = moment(date).format('DD/MM/YYYY HH:mm:ss')

                                var modalObj = _this.db['maintenance_tasks'].build({
                                    owner_id: usersession.employee.emp_id,
                                    machine_id: machines.machine_id,
                                    department_id: departement_id,
                                    created_at: new Date(),
                                    maintenance_status_id: 4,
                                    bug_description: date,
                                    active: 'Y',
                                    source: 'manuel'
                                });

                                modalObj.save()
                                    .then(maintenance_tasks => {

                                        
                                        res.send({
                                            success: true,
                                            data: maintenance_tasks
                                        });
                                        return;
                                    });

                            }
                        })
                    }
                })


            } else {
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

        })

    }

    findMaintenanceFeedById(req, res, next) {
        let _this = this;
        let maintenance_task_id = req.params.maintenance_task_id;
        _this.db['maintenance_tasks'].findOne({
            where: {
                maintenance_task_id: maintenance_task_id
            }
        })
            .then(maintenance_tasks => {
                    _this.db['maintenance_feeds'].findAll({
                        include: [{
                            model: _this.db['usersessions']
                        },
                            {
                                model: _this.db['maintenance_tasks'],
                            },
                            {
                                model: _this.db['jobs'],
                            },
                            {
                                model: _this.db['employees']
                            },
                            {
                                model: _this.db['status_maintenances']
                            }
                        ],
                        where: {
                            maintenance_task_id: maintenance_tasks.maintenance_task_id,
                            active: 'Y'
                        }
                    })
                        .then(maintenance_feeds => {
                            if (maintenance_feeds) {
                                res.json({
                                    success: true,
                                    data: maintenance_feeds,
                                    messages: [{
                                        userMessage: "Maintenance Feed Info with success",
                                        internalMessage: 'Maintenance Feed Info with success',
                                        code: 10008,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10008"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            } else {
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: "Maintenance Feed Info not exists",
                                        internalMessage: 'Maintenance Feed Info not exists',
                                        code: 10009,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10009"
                                    }],
                                    attributes: [],
                                    status: 500
                                });
                            }

                        })
                }
            ).catch(err =>
            res.status(500).json(err)
        )
    }

    insertMaintenanceTask(req, res, next) {
        let _this = this;
        var maintenance_tasks = _this.db['maintenance_tasks'].build(req.body);
        maintenance_tasks.created_at = new Date();
        maintenance_tasks.save().then(maintenance_task => {
            if (maintenance_task) {
                var maintenance_feeds = _this.db['maintenance_feeds'].build(req.body);
                maintenance_feeds.maintenance_task_id = maintenance_task.maintenance_task_id;
                maintenance_feeds.status_maintenance_id = maintenance_task.maintenance_status_id;
                maintenance_feeds.department_id = maintenance_task.department_id;
                maintenance_feeds.feed_description = maintenance_task.bug_description;

                maintenance_feeds.save().then(maintenance_feed => {
                    if (maintenance_feed) {
                        res.json({
                            success: true,
                            data: {
                                maintenance_tasks: maintenance_task,
                                maintenance_feeds: maintenance_feed
                            },
                            messages: [{
                                userMessage: "Maintenance Task created with success",
                                internalMessage: 'Maintenance Task created with success',
                                code: 10006,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10006"
                            }],
                            attributes: [],
                            status: 200
                        });
                    } else {
                        res.json({
                            success: false,
                            data: null,
                            messages: [{
                                userMessage: "Maintenance Feed not created",
                                internalMessage: 'Maintenance Feed not created',
                                code: 10007,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10007"
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
                        userMessage: "Maintenance Task not created",
                        internalMessage: 'Maintenance Task not created',
                        code: 10005,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10005"
                    }],
                    attributes: [],
                    status: 200
                });
            }

        })
    }

    startMaintenanceFeed(req, res, next) {

        let params = req.body;

        let usersession_id = params.usersession_id;
        let started_at = params.started_at;
        let maintenance_task_id = params.maintenance_task_id;


        let _this = this;

        if ((maintenance_task_id == null) || (maintenance_task_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'maintenance_task_id not provided',
                        internalMessage: 'maintenance_task_id not provided',
                        code: 10000
                    }
                ]
            });
            return;
        }

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

        if ((started_at == null) || (started_at == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Start time not provided',
                        internalMessage: 'Start time not provided',
                        code: 1025
                    }
                ]
            });
            return;
        }

        _this.db['usersessions'].findOne({

            where: {
                usersession_id: usersession_id,
                $or: [
                    {
                        '$employee.job.job_name$': 'Mechanic'
                    },
                    {
                        '$employee.job.job_name$': 'Electronic'
                    }
                ]
            },
            include: [
                {
                    model: _this.db['employees'],
                    include: [
                        {
                            model: _this.db['jobs']
                        }
                    ]
                }
            ]

        }).then(usersession => {


            if (usersession) {

                _this.db['maintenance_tasks'].update(
                    {

                        maintenance_status_id: 2,
                        repared_by: usersession.employee.emp_id

                    },
                    {
                        where: {
                            maintenance_task_id: maintenance_task_id,

                        }
                    }
                ).then(result1 => {


                        var modalObj = _this.db['maintenance_feeds'].build({
                            usersession_id: usersession_id,
                            maintenance_task_id: maintenance_task_id,
                            started_at: new Date(started_at * 1000).getTime(),
                            department_id: usersession.employee.job.job_id,
                            repared_by: usersession.employee.emp_id,
                            status_maintenance_id: 2,
                            active: 'Y',
                            finished: 0
                        });

                        modalObj.save()
                            .then(maintenance_feed => {

                                res.send({
                                    success: true,
                                    data: maintenance_feed
                                });
                                return;
                            });

                })


            } else {
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

        })

    }


    taskMaintenanceFinished(req, res, next) {

        let params = req.body;
        let usersession_id = params.usersession_id;
        let finished_at = params.finished_at;
        let time = params.time;
        let code = params.status;
        let maintenance_template_id = params.maintenance_template_id;

        let maintenance_task_id = params.maintenance_task_id;


        let _this = this;

        if ((maintenance_template_id == null) || (maintenance_template_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Maintenance Template not provided',
                        internalMessage: 'Maintenance Template not provided',
                        code: 10011
                    }
                ]
            });
            return;
        }

        if ((maintenance_task_id == null) || (maintenance_task_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'maintenance_task_id not provided',
                        internalMessage: 'maintenance_task_id not provided',
                        code: 10000
                    }
                ]
            });
            return;
        }

        if ((code == null) || (code == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Status not provided',
                        internalMessage: 'Status not provided',
                        code: 10004
                    }
                ]
            });
            return;
        }

        if ((time == null) || (time == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Time not provided',
                        internalMessage: 'Time not provided',
                        code: 1023
                    }
                ]
            });
            return;
        }

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
            })
            return;
        }

        if ((finished_at == null) || (finished_at == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'End time not provided',
                        internalMessage: 'End time not provided',
                        code: 1026
                    }
                ]
            });
            return;
        }

        _this.db['usersessions'].findOne({

            where: {
                usersession_id: usersession_id,
                $or: [
                    {
                        '$employee.job.job_name$': 'Mechanic'
                    },
                    {
                        '$employee.job.job_name$': 'Electronic'
                    }
                ]
            },
            include: [
                {
                    model: _this.db['employees'],
                    include: [
                        {
                            model: _this.db['jobs']
                        },

                    ]
                },
                {
                    model: _this.db['boxes'],
                    include: [
                        {
                            model: _this.db['machines']
                        }
                    ]
                }
            ]
        }).then(usersession => {
            if (usersession) {


                    _this.db['maintenance_feeds'].findOne({
                        where: {
                            usersession_id: usersession_id,
                            maintenance_task_id: maintenance_task_id,
                            finished: 0
                        }
                    }).then(maintenance_feed => {

                        if (maintenance_feed) {

                            _this.db['maintenance_tasks'].findOne({
                                where: {
                                    maintenance_task_id: maintenance_task_id,
                                }
                            }).then(maintenance_task => {

                                let fin = new Date(finished_at * 1000).getTime();
                                let start = maintenance_task.created_at;

                                if (start < fin) {
                                    _this.db['maintenance_templates'].findOne({
                                        where: {
                                            maintenance_template_id: maintenance_template_id
                                        }
                                    }).then(maintenance_template => {
                                        _this.db['maintenance_feeds'].update(
                                            {
                                                finished_at: new Date(finished_at * 1000).getTime(),
                                                duration: time,
                                                maintenance_template_id: maintenance_template.maintenance_template_id,
                                                finished: 1,
                                                status_maintenance_id: code,
                                                feed_description : maintenance_template.label
                                            },
                                            {
                                                where: {
                                                    maintenance_feed_id: maintenance_feed.maintenance_feed_id
                                                }
                                            }
                                        ).then(result1 => {
                                            _this.db['machine_events'].build({
                                                date_time_event_start: maintenance_task.created_at,
                                                date_time_event_end: new Date(finished_at * 1000),
                                                event_id: 4,
                                                description: maintenance_template.label,
                                                machine_id: usersession.box.machine_id,
                                                cause: 'Maintenance Task <' + maintenance_task_id + '>'
                                            }).save().then(result2 => {


                                                if (result1[0] === 1) {

                                                    _this.db['maintenance_tasks'].update(
                                                        {
                                                            bug_description: maintenance_template.label,
                                                            maintenance_status_id: code,
                                                            repared_by: usersession.employee.emp_id,
                                                            repared_at: new Date(),
                                                            maintenance_template_id: maintenance_template_id
                                                        },
                                                        {
                                                            where: {
                                                                maintenance_task_id: maintenance_task_id
                                                            }
                                                        }).then(result1 => {

                                                            if (maintenance_task.machine_params_type_id) {

                                                                /*  ---- reset machine params ----
                                                                 */
                                                                _this.db['machine_params_types'].findOne({
                                                                    where: {
                                                                        machine_params_type_id: maintenance_task.machine_params_type_id
                                                                    }
                                                                }).then(machine_params_type => {

                                                                    if (machine_params_type) {
                                                                        _this.db['machine_params'].update(
                                                                            {
                                                                                quantity_limit: machine_params_type.quantity,
                                                                                quantity_done: 0
                                                                            },
                                                                            {
                                                                                where: {
                                                                                    machine_id: maintenance_task.machine_id,
                                                                                    machine_params_type_id: maintenance_task.machine_params_type_id,
                                                                                }
                                                                            }).then(machineparamsUpdated => {

                                                                                });

                                                                    }
                                                                });
                                                            }

                                                    });


                                                    res.send({
                                                        success: true,
                                                        data: null,
                                                        messages: [
                                                            {
                                                                userMessage: 'This maintenance task is finished',
                                                                internalMessage: 'This maintenance task is finished',
                                                                code: 10002
                                                            }
                                                        ]
                                                    });
                                                    return;

                                                } else {
                                                    res.send({
                                                        success: false,
                                                        data: null,
                                                        messages: [
                                                            {
                                                                userMessage: 'A problem has occured, this maintenance task is not finished',
                                                                internalMessage: 'A problem has occured, this maintenance task is not finished',
                                                                code: 10003
                                                            }
                                                        ]
                                                    });
                                                    return;
                                                }

                                            })
                                        });
                                    })

                                } else {
                                    res.send({
                                        success: true,
                                        data: null,
                                        messages: [
                                            {
                                                userMessage: 'Invalid Date',
                                                internalMessage: 'Invalid Date',
                                                code: 1033
                                            }
                                        ]
                                    });
                                    return;
                                }

                            })
                        } else {
                            res.send({
                                success: false,
                                data: null,
                                messages: [
                                    {
                                        userMessage: 'Expired Session',
                                        internalMessage: 'Expired Session',
                                        code: 1032
                                    }
                                ]
                            });
                            return;
                        }


                    })


            } else {
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
        })
    }


    openedmaintenanceTaskList(req, res, next) {
        let _this = this;

        let usersession_id = req.query.usersession_id;

        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Invalid user session data',
                        internalMessage: 'Invalid user session data',
                        code: 1006
                    }
                ]
            });
            return;
        }

        _this.db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id,
                $or: [
                    {
                        '$employee.job.job_name$': 'Mechanic'
                    },
                    {
                        '$employee.job.job_name$': 'Electronic'
                    }
                ]
            },
            include: [
                {
                    model: _this.db['employees'],
                    include: [
                        {
                            model: _this.db['jobs']
                        }
                    ]
                }
            ]
        }).then(usersession => {


            if (usersession) {

                _this.db['maintenance_tasks'].findAll({
                    where: {

                        'department_id': usersession.employee.job.job_id,
                        '$or': [
                            {
                                '$status_maintenance.code$': 'waiting'
                            },
                            {
                                '$status_maintenance.code$': 'not_fix'
                            },
                            {
                                '$status_maintenance.code$': 'under_repair'
                            }
                        ],
                        active : 'Y'
                    },
                    order: [
                        ['created_at', 'DESC']
                    ],
                    include: [
                        {
                            model: _this.db['status_maintenances']
                        }
                    ]
                }).then(maintenance_tasks => {
                    res.send({
                        success: true,
                        data: maintenance_tasks
                    });
                    return;
                })

            } else {
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

        })


    }

    getMaintenanceFeedsByTaskMaintenance_id(req, res, next) {
        let _this = this;
        let params = req.params.params;
        console.log(params);
        params = (params && params.length) ? JSON.parse(params) : {};

        var _id = params.id;

        _this.db['maintenance_feeds'].findAll({
            where: {
                maintenance_task_id: _id
            },
            include: [
                {
                    model: _this.db['usersessions'],
                    include: [
                        {
                            model: _this.db['employees']
                        }
                    ]

                },
                {
                    model: _this.db['jobs']
                },
                {
                    model: _this.db['status_maintenances']
                },
                {
                    model: _this.db['maintenance_templates']
                },
                {
                    model: _this.db['maintenance_tasks']
                }
            ]
        }).then(result => {
            res.send({
                data: result,
                success: true
            })
        })
    }



    getmechanical_unplanned_maintenance_tasks(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;

        let sql= 'SELECT vmtsku.*, lin.line_label, mch.machine_label,\n' +
            'owner_empl.emp_name as owner_empl_name,\n' +
            'repairer_empl.emp_name as repairer_empl_name,\n' +
            'status_maintenance.label as status_maintenance_label\n' +
            '\n' +
            'FROM views_mtsk_unplanned as vmtsku\n' +
            'LEFT JOIN lines as lin on lin.line_id = vmtsku.line_id\n' +
            'LEFT JOIN machines as mch on mch.machine_id = vmtsku.machine_id\n' +
            'LEFT JOIN employees as owner_empl on owner_empl.emp_id = vmtsku.owner_id\n' +
            'LEFT JOIN employees as repairer_empl on repairer_empl.emp_id = vmtsku.repared_by\n' +
            'LEFT JOIN status_maintenances as status_maintenance on status_maintenance.status_maintenance_id = vmtsku.maintenance_status_id\n' +
            '\n' +
            '\n' +
            'WHERE department_id = 3'

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }


    total_mechanical_unplanned_maintenance_task(req, res, next) {
        let db = require('../models');

        let sql= 'SELECT count(*) as total_mechanical_unplanned_maintenance_task\n' +
            'FROM views_mtsk_unplanned\n' +
            'WHERE department_id = 3';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }



    getElectronics_unplanned_maintenance_tasks(req, res, next) {
        let db = require('../models');

        let sql= 'SELECT vmtsku.*, lin.line_label, mch.machine_label,\n' +
            'owner_empl.emp_name as owner_empl_name,\n' +
            'repairer_empl.emp_name as repairer_empl_name,\n' +
            'status_maintenance.label as status_maintenance_label\n' +
            '\n' +
            '\n' +
            'FROM views_mtsk_unplanned as vmtsku\n' +
            'LEFT JOIN lines as lin on lin.line_id = vmtsku.line_id\n' +
            'LEFT JOIN machines as mch on mch.machine_id = vmtsku.machine_id\n' +
            'LEFT JOIN employees as owner_empl on owner_empl.emp_id = vmtsku.owner_id\n' +
            'LEFT JOIN employees as repairer_empl on repairer_empl.emp_id = vmtsku.repared_by\n' +
            'LEFT JOIN status_maintenances as status_maintenance on status_maintenance.status_maintenance_id = vmtsku.maintenance_status_id\n' +
            '\n' +
            'WHERE department_id = 4\n';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }

    total_electronic_unplanned_maintenance_task(req, res, next) {
        let db = require('../models');

        let sql= 'SELECT count(*) as total_electronic_unplanned_maintenance_task\n' +
            'FROM views_mtsk_unplanned\n' +
            'WHERE department_id = 4';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }

    views_stats_break_down_per_maintenance_template(req, res, next) {
        let db = require('../models');

        let sql= 'SELECT mt.*, count(mt.maintenance_template_id) as total_opened_maintenance_tasks, SUM(vmtskd.offline_duration) as total_break_down_time\n' +
            'FROM maintenance_templates as mt\n' +
            'LEFT JOIN views_maintenance_task_data as vmtskd on vmtskd.maintenance_template_id = mt.maintenance_template_id\n' +
            'WHERE mt.active = \'Y\'\n' +
            'GROUP BY mt.maintenance_template_id\n' +
            'ORDER BY count(mt.maintenance_template_id) DESC';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }



    views_stats_break_down_per_machine_type(req, res, next) {
        let db = require('../models');

        let sql= 'SELECT mtp.*, count(vmtskd.*) as total_tickets_opened, SUM(vmtskd.offline_duration) as total_break_down_time\n' +
            'FROM machines as mch\n' +
            'LEFT JOIN views_maintenance_task_data as vmtskd on mch.machine_id = vmtskd.machine_id\n' +
            'LEFT JOIN machine_types as mtp on mtp.machine_type_id = mch.machine_type_id\n' +
            'WHERE mch.active = \'Y\'\n' +
            'GROUP BY mtp.machine_type_id\n' +
            'ORDER BY count(vmtskd.*) DESC';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }

    view_mtsk_unplanned(req, res, next) {

        let db = require('../models');
        let state_date = req.query.state_date;
        let line_id = req.query.line_id;

        if ( line_id === 'all' || line_id === '' ) {
            var sql = 'SELECT mtsk.*, sm.label as label_status, machine.machine_label \n' +
                '\tFROM public.views_mtsk_unplanned as mtsk\n' +
                'LEFT JOIN status_maintenances as sm on sm.status_maintenance_id = mtsk.maintenance_status_id\n' +
                'LEFT JOIN machines as machine on machine.machine_id = mtsk.machine_id\n' +
                'where mtsk.day_maintenance_task = \'' + state_date + '\'';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        } else {
            var sql = 'SELECT mtsk.*, sm.label as label_status, machine.machine_label \n' +
                '\tFROM public.views_mtsk_unplanned as mtsk\n' +
                'LEFT JOIN status_maintenances as sm on sm.status_maintenance_id = mtsk.maintenance_status_id\n' +
                'LEFT JOIN machines as machine on machine.machine_id = mtsk.machine_id\n' +
                'where mtsk.day_maintenance_task = \'' + state_date + '\'and mtsk.line_id =' + line_id;
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

    mtsk_onhold_under_repair(req, res, next) {
        let db = require('../models');
        let stats_date = req.query.stats_date;

        let sql= 'SELECT SUM(vmtskd.total_time_maintenance) as total_time_maintenance,\n' +
            'SUM(vmtskd.offline_duration) as offline_duration,\n' +
            'COUNT(vmtskd.*) as total_tickets,\n' +
            'SUM(vmtskd.offline_duration) - SUM(vmtskd.total_time_maintenance) as on_hold_duration,\n' +
            'vmtskd.day_maintenance_task,\n' +
            'vmtskd.source\n' +
            '\n' +
            'FROM views_maintenance_task_data as vmtskd\n' +
            '\n' +
            'WHERE vmtskd.day_maintenance_task = \'' + stats_date +'\'\n' +
            '\n' +
            'GROUP BY vmtskd.day_maintenance_task, vmtskd.source';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }


    mtsk_planned_unplanned_by_source(req, res, next) {
        let db = require('../models');
        let stats_date = req.query.stats_date;

        let sql= 'SELECT t01.source as source,t01.day_maintenance_task, count(t01.*) as total_tickets\n' +
            'FROM views_mtsk_by_machine_by_day_by_group_status_by_source as t01\n' +
            'WHERE t01.day_maintenance_task = \'' + stats_date +'\'\n' +
            'GROUP BY t01.source, t01.day_maintenance_task';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }

    total_break_down_run_time(req, res, next) {
        let db = require('../models');
        let stats_date = req.query.stats_date;

        let sql= 'SELECT T_G.offline_duration as total_break_down_duration, (T_G.total_time_login * T_G.total_machines) as total_run_time\n' +
            'FROM (SELECT SUM(t01.offline_duration) as offline_duration,\n' +
            'date_part(\'epoch\'::text, CURRENT_TIMESTAMP) - (date_part(\'epoch\'::text, now()::date) + (8 * 3600)) as total_time_login,\n' +
            'count(mch.*) as total_machines\n' +
            '\n' +
            '\n' +
            'FROM views_maintenance_task_data as t01\n' +
            'LEFT JOIN machines as mch on mch.active = \'Y\' and 1=1\n' +
            '\n' +
            'WHERE t01.day_maintenance_task = \'' + stats_date + '\') AS T_G';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }


    uplanned_brakedown_records(req, res, next) {
        let db = require('../models');
        let stats_date = req.query.stats_date;

        let sql= 'SELECT count(t01.*), t01.day_maintenance_task, t01.date_hour_maintenance_task\n' +
            '\n' +
            'FROM views_mtsk_unplanned as t01\n' +
            'WHERE t01.day_maintenance_task = \'' + stats_date +'\'\n' +
            '\n' +
            'GROUP BY t01.day_maintenance_task, t01.date_hour_maintenance_task\n' +
            '\n' +
            'ORDER BY t01.date_hour_maintenance_task ASC\n';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }



    views_mechanical_availability(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;

        let sql= 'SELECT TG.total_machines,\n' +
            'TG.total_runned_time_needed,\n' +
            'TG.total_duration_mtsk_manuel,\n' +
            'TG.total_duration_mtsk_system,\n' +
            'TG.total_time_break,\n' +
            'TG.total_time_work,\n' +
            'TG.total_runned_time_needed - (TG.total_duration_mtsk_manuel + TG.total_duration_mtsk_system + TG.total_time_break + TG.total_time_work) as total_time_no_work,\n' +
            'TG.total_time_work as total_run_time,\n' +
            'TG.total_runned_time_needed - TG.total_time_work as total_down_time,\n' +
            '100 -((TG.total_duration_mtsk_manuel + TG.total_duration_mtsk_system) / TG.total_runned_time_needed * 100) as machines_disponibility\n' +
            '\n' +
            'FROM(\n' +
            '\tSELECT\n' +
            'count(mch.*) as total_machines,\n' +
            'CASE WHEN (TO_CHAR(now()::date, \'yyyymmdd\') = \''+state_date+'\') THEN ((date_part(\'epoch\'::text, CURRENT_TIMESTAMP) - (date_part(\'epoch\'::text, now()::date) + (8 * 3600))) * count(mch.*)) ELSE (count(mch.*) * 10 * 3600) END as total_runned_time_needed,\n' +
            'CASE WHEN TG_mtsk_manuel.total_duration_mtsk_manuel IS NOT NULL THEN TG_mtsk_manuel.total_duration_mtsk_manuel ELSE 0 END as total_duration_mtsk_manuel,\n' +
            'CASE WHEN TG_mtsk_system.total_duration_mtsk_system IS NOT NULL THEN TG_mtsk_system.total_duration_mtsk_system ELSE 0 END as total_duration_mtsk_system,\n' +
            'CASE WHEN TG_breaks.total_time_break IS NOT NULL THEN TG_breaks.total_time_break ELSE 0 END as total_time_break,\n' +
            'CASE WHEN TG_work.total_time_passed IS NOT NULL THEN TG_work.total_time_passed ELSE 0 END as total_time_work\n' +
            '\n' +
            '\n' +
            'FROM machines as mch\n' +
            '\n' +
            'LEFT JOIN (SELECT SUM(t03.offline_duration) as total_duration_mtsk_manuel FROM views_maintenance_task_data as t03 WHERE t03.day_maintenance_task = \''+state_date+'\' and t03.source = \'manuel\') as TG_mtsk_manuel on  1 = 1\n' +
            'LEFT JOIN (SELECT SUM(t03.offline_duration) as total_duration_mtsk_system FROM views_maintenance_task_data as t03 WHERE t03.day_maintenance_task = \' '+state_date+'\' and t03.source = \'system\') as TG_mtsk_system on  1 = 1\n' +
            'LEFT JOIN (SELECT SUM(t04.total_time_break) as total_time_break, t04.day_break as day_break FROM views_employee_breaks_by_day as t04 WHERE t04.day_break = \''+state_date+'\'GROUP BY t04.day_break) as TG_breaks on 1 = 1\n' +
            'LEFT JOIN (SELECT SUM(t05.time_passed) as total_time_passed, t05.date_operation as date_operation FROM views_cps_data as t05 WHERE t05.date_operation = \''+state_date+'\' GROUP BY t05.date_operation) as TG_work on 1 = 1\n' +
            'WHERE mch.active = \'Y\'\n' +
            '\n' +
            'GROUP BY TG_mtsk_manuel.total_duration_mtsk_manuel, TG_mtsk_system.total_duration_mtsk_system, TG_breaks.total_time_break, TG_work.total_time_passed) as TG';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }


    getByMachineID(req, res, next) {

        let _this= this;

        return ;
    }

    mtsk_planned_by_source(req, res, next) {
        let db = require('../models');
        let stats_date = req.query.stats_date;

        let sql='SELECT mtsk.source as source, count(mtsk.*) as total_tickets, \n' +
        'to_char(mtsk.created_at::date::timestamp with time zone, \'' + stats_date + '\'::text) AS day_maintenance_task \n' +

        'FROM maintenance_tasks as mtsk \n' +

        'WHERE (mtsk.maintenance_status_id = ANY (ARRAY[2, 3, 4])) AND lower(mtsk.source) = \'system\'::text \n' +
        'GROUP BY mtsk.source, mtsk.created_at'

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

module.exports = MaintenanceTaskDao;
