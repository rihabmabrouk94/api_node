const {baseModelDao} = require('./baseModalDao');

class MaintenanceTemplateDao extends baseModelDao {
    constructor() {
        super('maintenance_templates', 'maintenance_template_id');
        this.baseModal = 'maintenance_templates';
        this.primaryKey = 'maintenance_template_id';
    }

    getByDepartement(req, res, next) {
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
                },
                {
                    model: _this.db['boxes'],
                    include: [
                        {
                            model: _this.db['machines'],
                            include: [
                                {
                                    model: _this.db['machine_types']
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(usersession => {

            if (usersession && usersession.employee && usersession.employee.job) {

                _this.db['maintenance_templates'].findAll({
                    where: {
                        departement_id: usersession.employee.job.job_id,
                        machine_type_id: usersession.box.machine.machine_type_id
                    },
                    include: [
                        {
                            model: _this.db['jobs'],
                            require: false
                        },
                        {
                            model: _this.db['machine_types'],
                            require: false

                        }
                    ]
                }).then(operationTemplates => {
                    res.send({
                        success: true,
                        data: operationTemplates
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

    getByDepartementbtmachine_Type(req, res, next) {
        let _this = this;
        let maintenanceTemplatelist = []

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
                },
                {
                    model: _this.db['boxes'],
                    include: [
                        {
                            model: _this.db['machines'],
                            include: [
                                {
                                    model: _this.db['machine_types']
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(usersession => {

            if (usersession && usersession.employee && usersession.employee.job) {

                _this.db['maintenaceTemp_machineTypes'].findAll({
                    where: {

                        machine_type_id: usersession.box.machine.machine_type_id
                    },
                    include: [
                        {
                            model: _this.db['machine_types'],
                            require: false

                        }
                    ]
                }).then(maintenanceTemplates => {

                    var promise = new Promise(function (resolve, reject) {
                        var i = 0
                        maintenanceTemplates.forEach(maintenanceTemplate => {
                            _this.db['maintenance_templates'].findOne({
                                where: {
                                    departement_id: usersession.employee.job.job_id,
                                    maintenance_template_id: maintenanceTemplate.maintenance_template_id

                                },
                                include: [
                                    {
                                        model: _this.db['jobs'],
                                        require: false

                                    }
                                ]
                            }).then(item_maintenanceTemplates => {
                                if (item_maintenanceTemplates !== null) {
                                    maintenanceTemplatelist.push(item_maintenanceTemplates)
                                }
                                if (i === maintenanceTemplates.length - 1) {


                                    resolve(maintenanceTemplatelist)
                                }
                                i++
                            })
                        })
                    })

                    Promise.all([promise]).then(function (maintenanceTemplatelists) {
                        res.send({data: maintenanceTemplatelists[0], success: true})
                    })

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
}

module.exports = MaintenanceTemplateDao;
