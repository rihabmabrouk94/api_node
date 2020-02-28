const {baseModelDao} = require('./baseModalDao');

class NotificationDao extends baseModelDao {
    constructor() {
        super('notifications', 'notification_id');
        this.baseModal = 'notifications';
        this.primaryKey = 'notification_id';
    }

    notificationsRead(notifications){

        let  _this = this;

        return new Promise(function (resolve, reject) {
            let i = 0;

            notifications.forEach(function(notification) {

                _this.db['notification_reads'].findAll({
                    where : {
                        notification_id : notification.notification_id
                    }
                }).then(notifications_reads1 => {

                    notification.notification_reads= []
                    notification.notification_reads = notifications_reads1;

                    i++;

                    if( i === notifications.length) {
                        resolve(notifications);
                    }

                })


            })
        })


    }

    getForSession(req, res, next) {
        let _this = this;
        let usersession_id = req.query.usersession_id;
        let bundle_id = req.query.bundle_id;
        let operation_id = req.query.operation_id;

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
        if (usersession_id) {
            _this.db['usersessions'].findOne({
                where: {
                    usersession_id: usersession_id
                }
            }).then(usersessions => {
                if (usersessions) {
                    _this.db['employees'].findOne({
                        where: {
                            emp_id: usersessions.employee_id
                        }
                    }).then(employees => {
                        if (employees) {
                            _this.db['boxes'].findOne({
                                where: {
                                    box_id: usersessions.box_id
                                }
                            }).then(boxes => {
                                if (boxes) {
                                    _this.db['machines'].findOne({
                                        where: {
                                            machine_id: boxes.machine_id
                                        }
                                    }).then(machines => {
                                        if (machines) {
                                            _this.db['lines'].findOne({
                                                where: {
                                                    line_id: boxes.line_id
                                                }
                                            }).then(lines => {
                                                if (lines) {
                                                    _this.db['notifications'].findOne({
                                                        where: {
                                                            employee_id: usersessions.employee_id,
                                                            active: 'Y'
                                                        }
                                                    }).then(notifications => {
                                                        if (notifications) {
                                                            _this.db['notification_reads'].findOne({
                                                                where: {
                                                                    active: 'Y',
                                                                    employee_id: usersessions.employee_id,
                                                                    notification_id: notifications.notification_id
                                                                }
                                                            }).then(notification_reads => {
                                                                if (notification_reads) {
                                                                    _this.db['notifications'].findAll({
                                                                        where: {
                                                                            employee_id: usersessions.employee_id,
                                                                            active: 'Y',
                                                                        }
                                                                    }).then(notifications => {
                                                                        if (notifications) {
                                                                            _this.notificationsRead(notifications).then(notificationsRead3 => {
                                                                                    res.json({
                                                                                        success: true,
                                                                                        data:
                                                                                        notificationsRead3
                                                                                        ,
                                                                                        messages: [{
                                                                                            userMessage: "Notification info with success",
                                                                                            internalMessage: 'Notification info with success',
                                                                                            code: 9000,
                                                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9000"
                                                                                        }],
                                                                                        attributes: [],
                                                                                        status: 200
                                                                                    });

                                                                            });

                                                                        }else{
                                                                            res.json({
                                                                                success: false,
                                                                                data: null,
                                                                                messages: [{
                                                                                    userMessage: "Notification  not exists",
                                                                                    internalMessage: 'Notification  not exists',
                                                                                    code: 9001,
                                                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9001"
                                                                                }],
                                                                                attributes: [],
                                                                                status: 500
                                                                            });
                                                                        }
                                                                    })


                                                                } else {
                                                                    var modalObj = _this.db['notification_reads'].build({
                                                                        read : 'N',
                                                                    notification_id : notifications.notification_id,
                                                                    date_read : null,
                                                                    active : 'Y',
                                                                    employee_id : usersessions.employee_id,
                                                                        }

                                                                    );
                                                                    modalObj.save().then(result => {
                                                                        if(result){
                                                                            _this.db['notification_reads'].findAll({
                                                                                where: {
                                                                                    active: 'Y',
                                                                                    employee_id: usersessions.employee_id,
                                                                                }
                                                                            }).then(notification_reads => {
                                                                                if(notification_reads){
                                                                                    res.json({
                                                                                        success: true,
                                                                                        data: [{
                                                                                            notifications: notifications,
                                                                                            notification_reads: notification_reads
                                                                                        }],
                                                                                        messages: [{
                                                                                            userMessage: "Notification info with success",
                                                                                            internalMessage: 'Notification info with success',
                                                                                            code: 9000,
                                                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9000"
                                                                                        }],
                                                                                        attributes: [],
                                                                                        status: 200
                                                                                    });
                                                                                }else{
                                                                                    res.json({
                                                                                        success: false,
                                                                                        data: null,
                                                                                        messages: [{
                                                                                            userMessage: "Notification Read not exists",
                                                                                            internalMessage: 'Notification Read not exists',
                                                                                            code: 9002,
                                                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9002"
                                                                                        }],
                                                                                        attributes: [],
                                                                                        status: 500
                                                                                    });

                                                                                }
                                                                            })
                                                                        }
                                                                    });

                                                                }
                                                            })
                                                        } else {
                                                            res.json({
                                                                success: false,
                                                                data: null,
                                                                messages: [{
                                                                    userMessage: "Notification Read not exists",
                                                                    internalMessage: 'Notification Read not exists',
                                                                    code: 9002,
                                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9002"
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
                                                            userMessage: "Invalid line data﻿",
                                                            internalMessage: 'Invalid line data﻿s',
                                                            code: 1029,
                                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1029"
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
                                                    userMessage: "Invalid Machine data",
                                                    internalMessage: 'Invalid Machine data',
                                                    code: 6003,
                                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/6003"
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
                                            userMessage: "Invalid box data",
                                            internalMessage: 'Invalid box data',
                                            code: 1028,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1028"
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
                                    userMessage: "Invalid Employee data",
                                    internalMessage: 'Invalid Employee data',
                                    code: 1027,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1027"
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
                            userMessage: "Invalid user session data",
                            internalMessage: 'Invalid user session data',
                            code: 1006,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1006"
                        }],
                        attributes: [],
                        status: 500
                    });
                }

            })
        } else if (bundle_id) {
            _this.db['bundles'].findOne({
                where: {
                    bundle_id: bundle_id
                }
            }).then(bundles => {
                if (bundles) {
                    _this.db['notification_reads'].findAll({
                        include: [
                            {
                                model: _this.db['notifications'],
                                where: {
                                    bundle_id: bundles.bundle_id
                                }
                            }
                        ],
                        where: {
                            active: 'Y'
                        }
                    }).then(notifications => {
                        if (notifications) {
                            res.json({
                                success: true,
                                data: notifications,
                                messages: [{
                                    userMessage: "Notification info with success",
                                    internalMessage: 'Notification info with success',
                                    code: 9000,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9000"
                                }],
                                attributes: [],
                                status: 200
                            });
                        } else {
                            res.json({
                                success: false,
                                data: null,
                                messages: [{
                                    userMessage: "Notification not exists",
                                    internalMessage: 'Notification not exists',
                                    code: 9001,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9001"
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
                            userMessage: "Invalid Bundle data",
                            internalMessage: 'Invalid Bundle data',
                            code: 5004,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/5004"
                        }],
                        attributes: [],
                        status: 500
                    });
                }


            })
        } else if (operation_id) {
            _this.db['operations'].findOne({
                where: {
                    operation_id: operation_id
                }
            }).then(operations => {
                if (operations) {
                    _this.db['notifications'].findOne({
                        where: {
                            operation_id: operations.operation_id,
                            active: 'Y'
                        }
                    }).then(notifications => {
                        if (notifications) {
                            _this.db['notification_reads'].findOne({
                                include: [
                                    {
                                        model: _this.db['notifications'],
                                        where: {
                                            operation_id: operations.operation_id
                                        }
                                    }
                                ],
                                where: {
                                    notification_id: notifications.notification_id,
                                    active: 'Y'
                                }
                            }).then(notification_reads => {
                                if (notification_reads) {
                                    res.json({
                                        success: true,
                                        data: notification_reads,
                                        messages: [{
                                            userMessage: "Notification info with success",
                                            internalMessage: 'Notification info with success',
                                            code: 9000,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9000"
                                        }],
                                        attributes: [],
                                        status: 200
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        messages: [{
                                            userMessage: "Notification Read not exists",
                                            internalMessage: 'Notification Read not exists',
                                            code: 9002,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9002"
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
                                    userMessage: "Notification not exists",
                                    internalMessage: 'Notification not exists',
                                    code: 9001,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9001"
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
                            userMessage: "Invalid Operation",
                            internalMessage: 'Invalid Operation',
                            code: 4001,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/4001"
                        }],
                        attributes: [],
                        status: 500
                    });
                }
            })
        }
    }
    readMessageByUser(req, res, next) {
        let _this = this;
        let usersession_id = req.query.usersession_id;
        let notification_id = req.query.notification_id;
        var timeStamp = req.query.date_read;
        timeStamp = timeStamp * 1000;
        var date_read = new Date(timeStamp).getTime();
        if (date_read === null || date_read === '') {
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

        if (notification_id === null || notification_id === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid notification data",
                    internalMessage: 'Invalid notification data',
                    code: 9004,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9004"
                }],
                attributes: [],
                status: 500
            });
            return;
        }
        _this.db['usersessions'].findOne({
            where: {
                usersession_id: usersession_id,
                active: 'Y'
            }
        }).then(usersessions => {
            if (usersessions) {
                _this.db['employees'].findOne({
                    where: {
                        emp_id: usersessions.employee_id,
                        active: 'Y'
                    }
                }).then(employees => {
                    if (employees) {
                        _this.db['notifications'].findOne({
                            where: {
                                notification_id: notification_id
                            }
                        }).then(notifications => {
                            if (notifications) {
                                _this.db['notification_reads'].findOne({
                                    where: {
                                        employee_id: usersessions.employee_id,
                                        notification_id: notifications.notification_id,
                                    }
                                }).then(notification_reads => {
                                    if (notification_reads) {
                                        _this.db['notification_reads'].update({
                                            read :'Y',
                                            date_read: date_read},
                                        {
                                            where:{
                                                read : 'N',
                                                employee_id: usersessions.employee_id,
                                                notification_id: notifications.notification_id
                                            }
                                        }
                                        ).then(result => {
                                            if(result) {
                                                res.json({
                                                    success: true,
                                                    data: result,
                                                    messages: [{
                                                        userMessage: "Notification Read with success",
                                                        internalMessage: 'Notification Read with success',
                                                        code: 9003,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9003"
                                                    }],
                                                    attributes: [],
                                                    status: 200
                                                })
                                            }else{
                                                res.json({
                                                    success: false,
                                                    data: null,
                                                    messages: [{
                                                        userMessage: "Notification Already Read",
                                                        internalMessage: 'Notification Already Read',
                                                        code: 9004,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9004"
                                                    }],
                                                    attributes: [],
                                                    status: 500
                                                });
                                            }
                                        })

                                    } else {
                                        var modalObj = _this.db['notification_reads'].build({
                                                read : 'Y',
                                                notification_id : notifications.notification_id,
                                                date_read : date_read,
                                                active : 'Y',
                                                employee_id : usersessions.employee_id,
                                            }

                                        );
                                        modalObj.save().then(result => {
                                            if(result){
                                                res.json({
                                                    success: false,
                                                    data: null,
                                                    messages: [{
                                                        userMessage: "Notification Read with success",
                                                        internalMessage: 'Notification Read with success',
                                                        code: 9003,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9003"
                                                    }],
                                                    attributes: [],
                                                    status: 500
                                                });
                                            }
                                            else{
                                                res.json({
                                                    success: false,
                                                    data: null,
                                                    messages: [{
                                                        userMessage: "Notification not Read",
                                                        internalMessage: 'Notification not Read',
                                                        code: 9006,
                                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9006"
                                                    }],
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
                                    messages: [{
                                        userMessage: "Notification  not exists",
                                        internalMessage: 'Notification  not exists',
                                        code: 9001,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9001"
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
                                userMessage: "Employee  not exists",
                                internalMessage: 'Employee  not exists',
                                code: 1031,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1031"
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
                        userMessage: "User session not exists",
                        internalMessage: 'User session not exists',
                        code: 1008,
                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1008"
                    }],
                    attributes: [],
                    status: 500
                });
            }
        })

    }

    findAllNotifications(req, res, next) {
        let _this = this;
        let limit = (req.query.limit) ? req.query.limit : 10;
        let page = (req.query.page) ? req.query.page : 1;
        let offset = 0;
        _this.db['notifications'].findAndCountAll().then((data) => {
            let pages;
            pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            _this.db['notifications'].findAll({
                include:[
                    {
                        model:_this.db['employees']
                    },
                    {
                        model:_this.db['users']
                    },
                    {
                        model:_this.db['boxes']
                    },
                    {
                        model:_this.db['bundles']
                    },
                    {
                        model:_this.db['operations']
                    },
                    {
                        model:_this.db['machines']
                    },
                    {
                        model:_this.db['lines']
                    }
                ],
                limit: limit,
                offset: offset,
                $sort: {
                    id: 1
                },
                order : [
                    ['created_at', 'DESC']
                ],
                where: {
                    active: 'Y'
                }
            }).then(notifications => {
                res.send({
                    success: true,
                    data: notifications,
                    messages: [{
                        message: 'Notifications with success',
                        internalMessage: 'Notifications with success',
                        code: 4008,
                    }],
                    attributes:
                        {
                        pages: pages,
                            count:data.count,
                            limit: limit,
                            offset:offset
                    },
                    status: 200
                });
            })
        })

    }


    }

module.exports = NotificationDao;
