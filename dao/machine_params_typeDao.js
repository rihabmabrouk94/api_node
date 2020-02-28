const {baseModelDao} = require('./baseModalDao');

class MachineParamsTypeDao extends baseModelDao {
    constructor() {
        super('machine_params_types', 'machine_params_type_id');
        this.baseModal = 'machine_params_types';
        this.primaryKey = 'machine_params_type_id';
    }

    machineParamsByMachineParamsType(req, res, next) {
        let _this = this;
        let machine_params_type_id = req.params.machine_params_type_id;
        _this.db['machine_params_types'].findOne({
            where: {
                machine_params_type_id: machine_params_type_id
            }
        })
            .then(machine_params_types => {
                    if (machine_params_types) {
                        _this.db['machine_params'].findAll({
                            where: {
                                machine_params_type_id: machine_params_types.machine_params_type_id,
                                active: 'Y'
                            },
                            include: [{
                                model: this.db['machines']
                            },
                                {
                                    model: this.db['machine_params_types']
                                }
                            ]
                        })
                            .then(machine_params => {
                                if (machine_params) {
                                    res.json({
                                        success: true,
                                        data: machine_params,
                                        attributes: [],
                                        status: 200
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        attributes: [],
                                        status: 500
                                    });
                                }

                            })
                    } else {
                        res.json({
                            success: false,
                            data: null,
                            userMessage: "Machine Params Type not exists",
                            attributes: [],
                            status: 500
                        });
                    }
                }
            ).catch(err =>
            res.status(500).json(err)
        )
    }
}

module.exports = MachineParamsTypeDao;
