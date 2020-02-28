const {baseModelDao} = require('./baseModalDao');

class MachineTypeDao extends baseModelDao {
    constructor() {
        super('machine_types', 'machine_type_id');
        this.baseModal = 'machine_types';
        this.primaryKey = 'machine_type_id';
    }


    machineParamsTypeByMachineType(req, res, next) {
        let _this = this;
        let machine_type_id = req.params.machine_type_id;
        _this.db['machine_types'].findOne({
            where: {
                machine_type_id: machine_type_id
            }
        })
            .then(machine_types => {
                if(machine_types) {
                    _this.db['machine_params_types'].findAll({
                        where: {
                            machine_type_id: machine_types.machine_type_id,
                            active: 'Y'
                        },
                        include:[{
                            model: this.db['machine_types']
                        }]
                    })
                        .then(machine_params_types => {
                            if (machine_params_types) {
                                res.json({
                                    success: true,
                                    data: machine_params_types,
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
                }else{
                    res.json({
                        success: false,
                        data: null,
                        userMessage: "Machine Type not exists",
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

module.exports = MachineTypeDao;
