const {baseModelDao} = require('./baseModalDao');
const moment = require('moment');
class EmployeeDao extends baseModelDao {
    constructor() {
        super('employees', 'emp_id');
        this.baseModal = 'employees';
        this.primaryKey = 'emp_id';
    }


    logout(req, res, next) {

        var db = require('../models');

        var usersession_id = req.query.usersession_id;

        var rt =  moment.unix(req.query._rt).format("YYYY-MM-DD HH:mm:ss");
        if (usersession_id === null || usersession_id === '') {

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

        db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id
            }
        }).then(usersessions => {

            if (usersessions) {

                //1. Close usersession

                db['usersessions'].update(
                    {
                        time_out: rt,
                    },
                    {
                        where: {
                            usersession_id: usersession_id
                        }
                    });

                //2. Close CPS

                db['cart_pending_sessions'].findAll({
                    where: {
                        session_id: usersession_id
                    }
                }).then(cart_pending_sessions => {

                    cart_pending_sessions.forEach(function (cps) {

                        if (cps.updated_at === null) {

                            db['cart_pending_sessions'].update(
                                {
                                    updated_at: rt,
                                    end_time : rt //////////////////////////////////////////////
                                },
                                {
                                    where: {
                                        session_id: cps.session_id,
                                        end_time: null
                                    }
                                });

                        }

                    })

                    res.send({
                        "success": true,
                        "data": null,
                        "messages": [
                            {
                                userMessage: "Logout successful",
                                internalMessage: "Logout successful",
                                code: 1018,
                                more_info: null
                            }
                        ],
                        "attributes": [],
                        "status": 200
                    });
                    return;

                })


            } else {

                res.send({
                    success: false,
                    data: null,
                    messages: [
                        {
                            userMessage: 'User session not exists',
                            internalMessage: 'User session not exists',
                            code: 1008
                        }
                    ]
                });
                return;

            }

        })

    }

    closeOldSession(box_id, emp_id, rt) {
        let _this = this;
        var db = require('../models');

        return new Promise(function (resolve, reject) {
            _this.db['usersessions'].update({time_out: rt},
                {
                    where:
                        {
                            $or: [

                                {
                                    employee_id:
                                        {
                                            $eq: emp_id
                                        }
                                },
                                {
                                    box_id:
                                        {
                                            $eq: box_id
                                        }
                                },
                            ],
                            time_out: null,
                            active: 'Y'
                        }}).then(resCloseOldSessionsEmp => {

                // Find UserSession By Box and destroy
                _this.db['usersessions'].update({time_out: rt}, {
                    where: {box_id: box_id, time_out: null}}).then(resCloseOldSessionBox => {
                    _this.closeOldBreaks(emp_id, rt, box_id).then(r => {


                        _this.closeOldCps(emp_id,rt).then(cps => {

                            _this.closeOldMaintenanceFeeds(emp_id, rt).then(oldMaintenanceFeeds => {

                                resolve('ok')
                            })

                        })

                    })
                })



            });
        })


    }

    closeOldBreaks(emp_id, rt, box_id) {
        let _this = this;
        var db = require('../models');

        console.log('init close breaks')
        return new Promise(function (resolve, reject) {
            _this.db['breaks'].findAll({
                where : {
                    $or: [

                        {
                            '$usersession.employee.emp_id$':
                                {
                                    $eq: emp_id
                                }
                        },
                        {
                            '$usersession.box.box_id$':
                                {
                                    $eq: box_id
                                }
                        },
                    ],

                    'active': 'Y',
                    'end_time': null
                },
                include : [
                    {
                        model: _this.db['usersessions'],
                        include : [
                            {
                                model : _this.db['employees']
                            },
                            {
                                model : _this.db['boxes']
                            }
                        ]
                    }
                ]
            }).then(allBreaksByEmp => {

                console.log(allBreaksByEmp)

                let i=0;
                allBreaksByEmp.forEach(function (breaks) {

                    db['breaks'].update(
                        {
                            end_time: rt,
                            active: 'N'
                        },
                        {
                            where: {
                                break_id: breaks.break_id
                            }
                        }
                    ).then(result1 => {
                    });
                    i++;
                    if (i === allBreaksByEmp.length) {
                        resolve(allBreaksByEmp);
                    }

                });

                if (allBreaksByEmp.length === 0) {
                    resolve('ok')
                }

            })
        })
    }

    closeOldCps(emp_id, rt) {
        let _this = this;
        var db = require('../models');

        console.log('cps init')
        return new Promise(function (resolve, reject) {
            _this.db['cart_pending_sessions'].findAll({
                include: [
                    {
                        model: _this.db['usersessions'],
                        include : [
                            {
                                model : _this.db['employees']
                            }
                        ]
                    }
                ],
                where : {
                    '$usersession.employee.emp_id$': emp_id,
                    active: 'Y',
                    end_time: null
                }
            }).then(cart_pending_sessions => {


                let i =0;
                cart_pending_sessions.forEach(function(cps){

                    _this.db['cart_pending_operations'].update(
                        {
                            in_progress: 'N'
                        },
                        {
                            where: {
                                cart_pending_operation_id: cps.cart_pendingoperation_id
                            }
                        }).then(result2 => {
                    });

                    _this.db['cart_pending_sessions'].update(
                        {
                            end_time: rt,
                            active: 'N'
                        },
                        {
                            where: {
                                cart_pending_session_id: cps.cart_pending_session_id
                            }
                        }).then(result2 => {
                    });
                    i++;
                    if (i === cart_pending_sessions.length) {
                        console.log('i === cart_pending_sessions resolve')
                        resolve(cart_pending_sessions)
                    }

                })

                if(cart_pending_sessions.length === 0){

                    resolve('ok')
                }

            })
        })
    }

    closeOldMaintenanceFeeds(emp_id, rt){
        let _this = this;
        var db = require('../models');

        return new Promise(function (resolve, reject) {
            _this.db['maintenance_feeds'].findAll({
                include: [
                    {
                        model: _this.db['usersessions'],
                        include : [
                            {
                                model : _this.db['employees']
                            }
                        ]
                    }
                ],
                where : {
                    '$usersession.employee.emp_id$': emp_id,
                    active: 'Y',
                    finished_at: null
                }
            }).then(maintenance_feeds => {
                let i =0;


                maintenance_feeds.forEach(function(maintenanceFeed){

                    db['maintenance_feeds'].update(
                        {
                            finished_at: rt,
                            active: 'N',
                            finished: 1
                        },
                        {
                            where: {
                                maintenance_feed_id: maintenanceFeed.maintenance_feed_id
                            }
                        }).then(result2 => {
                    });
                    i++;

                    if (i === maintenance_feeds.length) {

                        resolve(maintenance_feeds)
                    }

                })

                if(maintenance_feeds.length === 0) {
                    resolve('ok')
                }

            })
        })
    }


    authAction(req, res, next) {



        var db = require('../models');
        var timeStamp =req.query._rt ;
        timeStamp = timeStamp *1000;

        var rt =  moment.unix(req.query._rt).format("YYYY-MM-DD HH:mm:ss");
        var rfid =  req.query.rfid;
        var addr = req.query.source_addr;
        var tag = 'C0';
        if (addr === null || addr === '') {


            res.send({
                success: false,
                messages: [
                    {
                        userMessage: 'Invalid source address data',
                        internalMessage: 'Invalid source address data',
                        code: 1002
                    }
                ]
            });
            return;
        }
        if (rfid === null || rfid === '') {
            res.send({
                success: false,
                messages: [
                    {
                        userMessage: 'Invalid RFID data',
                        internalMessage: 'Invalid RFID data',
                        code: 1001
                    }
                ]
            });
            return;
        }

        db['employees'].findOne({
            where: {
                emp_rfid: {
                    ilike: rfid
                }
            },
            include: [
                {
                    model: db['jobs']
                }
            ]
        }).then(user => {

            db['boxes'].findOne({
                include: [{
                    model: db['machines']
                }],
                where: {
                    box_macaddress: {
                        $iLike: addr
                    } 
                }
            }).then(box => {
                if (user && box && box.machine) {

                    this.closeOldSession(box.box_id, user.emp_id, rt ).then( closeAll=> {

                        console.log('closealll', closeAll)
                        // new userSerssion
                        const moment = require('moment');
                        db['usersessions'].build({
                            time_in: rt,
                            employee_id: user.emp_id,
                            box_id: box.box_id,
                            last_tag: tag,
                            active: 'Y'

                        }).save().then(result1 => {

                            var result111 = {};

                            db['usersessions'].findOne({
                                where: {
                                    usersession_id: result1.usersession_id
                                },
                                include: [
                                    {
                                        model: db['employees'],

                                        include: [
                                            {
                                                model: db['jobs']
                                            }
                                        ]
                                    },
                                    {
                                        model: db['boxes'],
                                        include: [
                                            {
                                                model: db['machines']
                                            },
                                            {
                                                model: db['lines'],
                                                include: [
                                                    {
                                                        model: db['direct_production_modes']
                                                    }
                                                ]
                                            }]
                                        }
                                    ]
                            }).then(user_session => {
                                res.send({
                                    success: true,
                                    data: user_session,
                                    status: 200
                                });
                                return;

                            })
                        });


                    })



                } else if (user && !box) {
                    res.send(
                        {
                            "success": false,
                            "data": null,
                            "messages": [
                                {
                                    "userMessage": "Box not affected to machine",
                                    "internalMessage": "Box not affected to machine",
                                    "code": 1017,
                                }
                            ],
                            "attributes": [],
                            "status": 500
                        }
                    );
                    return;

                } else {
                    res.send(
                        {
                            "success": false,
                            "data": null,
                            "messages": [
                                {
                                    "userMessage": "Rfid not exists",
                                    "internalMessage": "Rfid not exists",
                                    "code": 1004
                                }
                            ],
                            "attributes": [],
                            "status": 500
                        }
                    );
                    return;
                }
            })
        })
    }

    get_operators(req, res, next) {
        let db = require('../models');

        let state_date = req.query.state_date;
        let sql = 'SELECT count(t02.*) as total_employees\n' +
            'FROM employees as t02\n' +
            'WHERE t02.job_id = 1 and t02.active =\'Y\'';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    get_user_logged_in_current_day(req, res, next) {
        let db = require('../models');

        let state_date = req.query.state_date;
        let sql = 'SELECT count(t01.*) as total_employees_logged\n' +
            'FROM views_user_sessions_status_by_day as t01\n' +
            'WHERE day_session = \''+ state_date + '\'';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    get_total_employee_and_logged_employee (req, res, next ) {
        let db = require('../models');

        let state_date = req.query.state_date;
        console.log('state_date', state_date)
        let sql = 'SELECT * FROM (SELECT count(t02.emp_id) total_employees, tO3.total_employees_logged\n' +
            'FROM employees t02\n' +
            'LEFT JOIN (SELECT count(t01.*) as total_employees_logged FROM views_user_sessions_status_by_day as t01 WHERE day_session = \''+ state_date + '\') as tO3 ON 1=1\n' +
            'WHERE t02.job_id = 1 and t02.active =\'Y\' GROUP BY tO3.total_employees_logged) as tg LIMIT 1';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

 

    Add_user_mat(req, res, next ) {
        let db = require('../models');
        let _this = this;

        _this.db['employees'].findOne({
            where : {
                emp_matricule : req.body.emp_matricule
            }
        }).then(employee => {

            

            if (employee) {

                res.send({
                    "success": false,
                    "status": 2,
                    "data": null,
                    "messages": [
                        {
                           
                            "internalMessage": "Matricule found",
                           
                        }
                    ],
                    "attributes": [],
                })

            } else {
                _this.db['employees'].build(req.body).save().then(new_user => {
                    res.send({
                        "success": true,
                        "status": 1,
                        "data": new_user
                    }); 
                    return;
                })
            }

        })

    }

    update_user_mat(req, res, next ) {
        let db = require('../models');
        let _this = this;
        var whereQuery = {};
        whereQuery[this.primaryKey] =req.body.emp_id;

        _this.db['employees'].findOne({
            where : {
                emp_id : req.body.emp_id
            }
        }).then(employee => {

            console.log(employee.emp_matricule, req.body.emp_matricule)
            

            if (employee && employee.emp_matricule === parseInt(req.body.emp_matricule)) {
                console.log('11111')

                        this.db[this.baseModal].update(req.body,{where: whereQuery}).then(user => 
                    res.send({
                        "success": true,
                        "status": 1,
                        "data": user
                    })); 
                    return;
         
            } else {
                console.log('2222')
                _this.db['employees'].findOne({
                    where : {
                        emp_matricule : req.body.emp_matricule
                    }
                }).then(employee => {

                    if (employee) {

                        res.send({
                            "success": false,
                            "status": 2,
                            "data": null,
                            "messages": [
                                {
                                
                                    "internalMessage": "Matricule found",
                                
                                }
                            ],
                            "attributes": [],
                        })

                    } else {
                        this.db[this.baseModal].update(req.body,{where: whereQuery}).then(user => 
                            res.send({
                                "success": true,
                                "status": 1,
                                "data": user
                            })); 
                            return;
                        
                    }
                })

            }

            

            

        })

    }

}
var uploadFile = function (req, res, next) {
    this.db.employees.findById(req.param('emp_id')).then(employee => {
        console.log(req.file);
        this.db.employees.update(
            {emp_picpath: req.file.filename},
            {where: {emp_id: req.params.emp_id}})
            .then(result =>
                res.json({'result': 1, 'employee': employee})
            )
    }).catch(error => {
        res.status(500).json(error);
    })
};

module.exports = EmployeeDao,
    {
        uploadFile: uploadFile
    };
