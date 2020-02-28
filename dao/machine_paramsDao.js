const {baseModelDao} = require('./baseModalDao');

class MachineParamsDao extends baseModelDao {
    constructor() {
        super('machine_params', 'machine_params_id');
        this.baseModal = 'machine_params';
        this.primaryKey = 'machine_params_id';
    }

    generateWork(req, res, next) {

        let _this = this;

        let back_stitch = req.query.back_stitch;
        let down_time = req.query.down_time;
        let stitch_count = req.query.stitch_count;
        let total_time = req.query.total_time;
        let session_id = req.query.session_id;

        let start_time = req.query.start_time;

        if (back_stitch == null || back_stitch == '') {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Back stitch not provided',
                        internalMessage: 'Back stitch not provided',
                        code: 15000
                    }
                ]
            });
            return;
        }

        if (down_time == null || down_time == '') {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Down Time not provided',
                        internalMessage: 'Down Time not provided',
                        code: 15001
                    }
                ]
            });
            return;
        }

        if (stitch_count == null || stitch_count == '') {
            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Stitch count not provided',
                        internalMessage: 'Stitch count not provided',
                        code: 15002
                    }
                ]
            });
            return;
        }

        if (total_time == null || total_time == '') {
            total_time = null
        }

        if (session_id == null || session_id == '') {
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

        let quantity = Number(stitch_count) + Number(back_stitch);


        _this.db['usersessions'].findOne({
            where: {
                usersession_id: session_id,
                time_out: null,
                active: 'Y'
            },
            // required: false,
            include: [
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
        }).then(userSession => {

            if (userSession) {


                _this.db['machine_params'].findAll({
                    where: {
                        // machine_params_id : machine_params_type.machine_params_id,
                        machine_id: userSession.box.machine_id,
                        //    machine_params_type_id: machine_params_type.machine_params_type_id,
                    },
                    include: [
                        {
                            model: _this.db['machine_params_types']
                        }
                    ]
                }).then(machine_params => {

                    _this.updateMachineParams(machine_params, quantity, userSession, req.query).then( machineParamsUpdated => {
                        res.send(machineParamsUpdated);
                        return;
                    });


                });
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

    updateMachineParams(machine_params, quantity, userSession, params) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            if (machine_params.length === 0) {
                resolve({
                    success: true,
                    data: null, 
                    message : 'This machine does not contain any params'
                })
            } else {
                let i = 0;
                machine_params.forEach(machine_param => {


                    _this.db['machine_params_types'].findOne({
                        where: {
                            machine_params_type_id: machine_param.machine_params_type_id
                        }
                    }).then(machine_params_type => {


                        if ((Number(machine_param.quantity_done) + Number(quantity)) <= machine_params_type.quantity) {

                            _this.db['machine_params'].update(
                                {
                                    quantity_limit: machine_params_type.quantity,
                                    quantity_done: Number(machine_param.quantity_done) + Number(quantity)
                                },
                                {
                                    where: {
                                        machine_params_id: machine_param.machine_params_id
                                    }
                                }).then(machineparamsUpdated => {

                                _this.db['machine_events'].build({
                                    machine_id: userSession.box.machine_id,
                                    date_time_event_start : Date.now(),
                                    event_type: 'work',
                                    event_id: 1,
                                    cause: '<' + machine_param.machine_params_id + '> Machine Params',
                                    description:  'Machine Params -' + machine_params_type.label,
                                    machine_event_type_id: 1,
                                    event_quantity: quantity,
                                    saved_at: Date.now(),
                                    down_time: params.down_time,
                                    total_time: params.total_time,
                                    stitch_count: params.stitch_count,
                                    back_stitch: params.back_stitch

                                }).save().then(maintenanceTaskSaved => {

                                    i++;

                                    if (i === machine_params.length) {

                                        resolve({
                                            success: true,
                                            message : 'Machine params updated'
                                        })
                                    }
                                })



                            });

                        } else {

                            _this.db['machine_events'].build({
                                machine_id: userSession.box.machine_id,
                                date_time_event_start : Date.now(),
                                event_type: 'work',
                                event_id: 1,
                                cause: '<' + machine_param.machine_params_id + '> Machine Params',
                                description:  'Machine Params -' + machine_params_type.label,
                                machine_event_type_id: 1,
                                event_quantity: quantity,
                                saved_at: Date.now(),
                                down_time: params.down_time,
                                total_time: params.total_time,
                                stitch_count: params.stitch_count,
                                back_stitch: params.back_stitch

                            }).save().then(maintenanceTaskSaved => {

                            })

                            _this.db['maintenance_tasks'].findOne({
                                where: {
                                    machine_id: machine_param.machine_id,
                                    department_id: 3,
                                    machine_params_type_id: machine_params_type.machine_params_type_id
                                }
                            }).then(maintenanceTask => {

                                if (maintenanceTask) {

                                    _this.db['maintenance_tasks'].update(
                                        {
                                            quantity_done: Number(machine_param.quantity_done) + Number(quantity),
                                            bug_description: machine_params_type.label
                                        },
                                        {
                                            where: {
                                                machine_id: machine_param.machine_id,
                                                department_id: 3,
                                                machine_params_type_id: machine_params_type.machine_params_type_id
                                            }
                                        }).then(machineparamsUpdated => {

                                        i++;

                                        if (i === machine_params.length) {

                                            resolve({
                                                success: false,
                                                message : 'Full params - Maintenance Task created'
                                            });
                                        }
                                    });
                                } else {

                                    _this.db['maintenance_tasks'].build({
                                        machine_id: machine_param.machine_id,
                                        created_at :  new Date().getTime(),
                                        department_id: 3,
                                        bug_description: machine_params_type.label,
                                        maintenance_status_id: 4,
                                        source: 'System',
                                        machine_params_type_id: machine_params_type.machine_params_type_id
                                    }).save().then(maintenanceTaskSaved => {
                                        i++;

                                        if (i === machine_params.length) {

                                            resolve({
                                                success: false,
                                                message : 'Full params - Maintenance Task created'
                                            });
                                        }
                                    });
                                }
                            });

                        }











                    })

                })
            }
        });
    }
}

module.exports = MachineParamsDao;
