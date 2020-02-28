const {baseModelDao} = require('./baseModalDao');

class BreakDao extends baseModelDao {
    constructor() {
        super('breaks', 'break_id');
        this.baseModal = 'breaks';
        this.primaryKey = 'break_id';
    }

// Start Break
    getBreakListAction(req, res, next) {
        let usersession_id = req.query.usersession_id;
        let break_type_id = req.query.break_type_id;
        let rt = req.query._rt;
        if (usersession_id === null || usersession_id === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid user session data",
                    internalMessage: 'Invalid user session data',
                    code: 1006,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1006"
                }],
                attributes: [],
                status: 500
            });
            return;
        }
        if (break_type_id === null || break_type_id === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid break type data",
                    internalMessage: 'Invalid break type data',
                    code: 3001,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3001"
                }],
                attributes: [],
                status: 500
            });
            return;
        }

        this.db['breaks'].update(
            {
                active: 'N',
            },
            {
                where: {
                    usersession_id: usersession_id,
                    breaktype_id: break_type_id,
                    end_time: null,
                    active: 'Y'
                }
            }
        ).then(result1 => {

            let Startbreak = {};
            Startbreak.breaktype_id = break_type_id;
            Startbreak.usersession_id = usersession_id;
            Startbreak.active = 'Y';
            Startbreak.start_time = new Date(rt * 1000).getTime();
            Startbreak.push_time = new Date(rt * 1000).getTime();
            var modalObj = this.db['breaks'].build(Startbreak);
            modalObj.save()
                .then(Startbreak => {
                    if (Startbreak) {
                        this.db['breaks'].findOne({
                            include: [
                                {
                                    model: this.db['usersessions'],
                                    where: {
                                        usersession_id: usersession_id,
                                        time_out: null,
                                    },
                                    include: [
                                        {
                                            model: this.db['employees'],
                                        },
                                        {
                                            model: this.db['carts']
                                        }
                                    ]
                                },
                                {
                                    model: this.db['break_types']
                                }
                            ],
                            where: {
                                usersession_id: usersession_id,
                                breaktype_id: break_type_id,
                                break_id: Startbreak.break_id
                            }
                        }).then((breaks) => {
                            if (breaks) {
                                res.send({
                                    success: true,
                                    data: breaks,
                                    messages: [{
                                        message: 'Start Break with success',
                                        internalMessage: 'Start Break with success',
                                        code: 3003,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3003"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            } else {
                                res.send({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        message: 'Break not exists',
                                        internalMessage: 'Break not exists',
                                        code: 3005,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3005"
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
                                message: 'User session not exists',
                                internalMessage: 'User session not exists',
                                code: 1008,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1008"
                            }],
                            attributes: [],
                            status: 500
                        });
                    }
                });

        })

    }

    // Finish Break

    finishBreakAction(req, res, next) {
        let break_id = req.query.break_id;
        var timeStamp = req.query._rt;
        timeStamp = timeStamp * 1000;
        var _rt = new Date(timeStamp).getTime();

        let supervisor_rfid = req.query.supervisor_rfid;
        if (break_id === null || break_id === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid break data",
                    internalMessage: 'Invalid break data',
                    code: 3007,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3007"
                }],
                attributes: [],
                status: 500
            });
            return;
        }
        if (_rt === null || _rt === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid request time data",
                    internalMessage: 'Invalid request time data',
                    code: 1003,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1003"
                }],
                attributes: [],
                status: 500
            });
            return;
        }

        this.db['breaks'].findOne(
            {
                where:
                    {
                        break_id: break_id,
                    }
            }).then((breaks) => {
            if (!breaks) {
                res.json({
                    success: false,
                    data: null,
                    messages: [{
                        userMessage: "Break not exists",
                        internalMessage: 'Break not exists',
                        code: 3004,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3004"
                    }],
                    attributes: [],
                    status: 500
                });
            } else {
                this.db['breaks'].findOne(
                    {
                        include: [
                            {
                                model: this.db['break_types'],
                                where: {
                                    need_validation: 'Y'
                                }
                            }
                        ],
                        where:
                            {
                                break_id: break_id,
                            }
                    }).then((NeedValidation) => {
                    if (NeedValidation) {



                        if (supervisor_rfid === null || supervisor_rfid === '') {
                            res.json({
                                success: false,
                                data: null,
                                messages: [{
                                    userMessage: "Invalid Supervisor",
                                    internalMessage: 'Invalid Supervisor',
                                    code: 1013,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1013"
                                }],
                                attributes: [],
                                status: 500
                            });
                            return;
                        }

                        this.db['employees'].findOne({
                            where: {
                                emp_rfid: supervisor_rfid
                            },
                            include: [
                                {
                                    model: this.db['jobs'],
                                    where: {
                                        job_name: 'Supervisor'
                                    }
                                }
                            ]

                        }).then(supervisor=> {
                            if (supervisor) {

                                if (breaks.end_time === null) {
                                    this.db['breaks'].update(
                                        {
                                            end_time: _rt,
                                        },
                                        {
                                            where: {
                                                break_id: breaks.break_id,
                                            }
                                        }
                                    ).then(result1 => {
                                        if (result1) {
                                            this.db['breaks'].findOne({
                                                where: {
                                                    break_id: breaks.break_id,
                                                }
                                            }).then(requestTime => {
                                                let start_time = breaks.start_time;
                                                let end_time = requestTime.end_time;
                                                if (end_time > start_time) {
                                                    res.json({
                                                        success: true,
                                                        data: null,
                                                        messages: [{
                                                            userMessage: "Break finished with success",
                                                            internalMessage: 'Break finished with success',
                                                            code: 3006,
                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3006"
                                                        }],
                                                        attributes: [],
                                                        status: 200
                                                    });
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        data: null,
                                                        messages: [{
                                                            userMessage: "Request time expired",
                                                            internalMessage: "Request time expired",
                                                            code: 1007,
                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1007"
                                                        }],
                                                        attributes: [],
                                                        status: 500
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        messages: [{
                                            userMessage: "Break already finished",
                                            internalMessage: "Break already finished",
                                            code: 3005,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3005"
                                        }],
                                        attributes: [],
                                        status: 500
                                    });
                                }

                            } else {

                                res.json({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: "Supervisor not exists",
                                        internalMessage: "Supervisor not exists",
                                        code: 1020,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1020"
                                    }],
                                    attributes: [],
                                    status: 500
                                });
                            }
                        })

                    } else {
                        if (breaks.end_time === null) {
                            this.db['breaks'].update(
                                {
                                    end_time: _rt,
                                },
                                {
                                    where: {
                                        break_id: breaks.break_id,
                                    }
                                }
                            ).then(result1 => {
                                if (result1) {
                                    this.db['breaks'].findOne({
                                        where: {
                                            break_id: breaks.break_id,
                                        }
                                    }).then(requestTime => {
                                        let start_time = breaks.start_time;
                                        let end_time = requestTime.end_time;
                                        if (end_time > start_time) {
                                            res.json({
                                                success: true,
                                                data: null,
                                                messages: [{
                                                    userMessage: "Break finished with success",
                                                    internalMessage: 'Break finished with success',
                                                    code: 3006,
                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3006"
                                                }],
                                                attributes: [],
                                                status: 200
                                            });
                                        } else {
                                            res.json({
                                                success: false,
                                                data: null,
                                                messages: [{
                                                    userMessage: "Request time expired",
                                                    internalMessage: "Request time expired",
                                                    code: 1007,
                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1007"
                                                }],
                                                attributes: [],
                                                status: 500
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.json({
                                success: false,
                                data: null,
                                messages: [{
                                    userMessage: "Break already finished",
                                    internalMessage: "Break already finished",
                                    code: 3005,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/3005"
                                }],
                                attributes: [],
                                status: 500
                            });
                        }
                    }

                })
            }
        })
    }


    getBreaks(req, res, next) {
        var params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};
        if (params.sortBy) {
            var order = [
                [params.sortBy, params.sortDir]
            ];
        }

        let _this = this;
        let offset = 0;
        this.db['breaks'].findAndCountAll({
            where: params.whereQuery,
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
                    model: _this.db['break_types']
                }
            ]
        }).then((countAll) => {


            let page = req.params.page; // page number
            let pages = Math.ceil(countAll.count / params.limit);
            offset = params.limit * (params.page - 1)


            console.log('params.page', params.page)

            console.log('offset', offset)
            this.db[this.baseModal].findAll({
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
                        model: _this.db['break_types']
                    }
                ],
                where: params.whereQuery,
                limit: params.limit,
                offset: offset,
                order: order

            }).then((data) => {

                res.send({
                    'data': data,
                    'count': countAll,
                    'offset': offset,
                    'limit': params.limit,
                    'pages': pages,
                    'params': params
                })

            })
        })
    }

    views_employee_breaks_by_day(req, res, next) {
        let db = require('../models');
        let start_time = req.query.start_time;

        let sql = 'SELECT * FROM breaks as b \n' +
            'LEFT JOIN usersessions as us on us.usersession_id=b.usersession_id\n' +
            'LEFT JOIN break_types as bt on b.breaktype_id= bt.break_type_id\n' +
            "WHERE b.start_time >= '" + start_time + " 00:00:00 ' and b.start_time <= '" + start_time + " 23:59:59 ' and b.active = \'Y\' \n" +
            'and b.start_time IS NOT NULL\n' +
            'and b.end_time IS NOT NULL\n' +
            'and b.end_time >= b.start_time';
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

module.exports = BreakDao;
