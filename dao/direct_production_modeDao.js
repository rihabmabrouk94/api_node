const {baseModelDao} = require('./baseModalDao');

class DirectProductionModeDao extends baseModelDao {
    constructor() {
        super('direct_production_modes', 'direct_production_mode_id');
        this.baseModal = 'direct_production_modes';
        this.primaryKey = 'direct_production_mode_id';
    }


    getOperationTemplateByDirectProductionMode (req, res, next) {
        let _this = this;
        let Sequelize = require('sequelize');
        let production_mode_id = req.query.production_mode_id;

        console.log('production_mode_id', production_mode_id)
        if (production_mode_id === '') {
            res.send(
                {
                    "success": false,
                    "data": null,
                    "messages": [
                        {
                            "userMessage": "Production Mode ID not provided",
                            "internalMessage": "Production Mode ID not provided",
                            "code": 4012,
                        }
                    ],
                    "attributes": [],
                    "status": 500
                }
            );
            return;
        }

        _this.db['operation_direct_production_modes'].findAll({

            order: [
                ['order', 'ASC']
            ],
            include: [
                {
                    distinct: true,
                    model : _this.db['operation_templates'],
                    include : [
                        {
                            model: _this.db['machine_types']
                        }
                    ]
                }
            ],


            where : {
                direct_production_mode_id: production_mode_id,
                active: 'Y'
            }
        }). then(operationTemplates => {
            res.send(operationTemplates);
            return;
        });
    }


    resolveUpdateOrders (req , res , next) {
        let _this = this;

        let operations = req.body

        let i = 0;

        return new Promise(function (resolve, reject) {
            if (operations.length === 0 ) {
                resolve('ok')
            }
            operations.forEach(function(operation) {
                if (operation && operation.active === 'Y') {
                    _this.db['operation_direct_production_modes'].update(
                        {
                            order: operation.order
                        }, {
                            where : {
                                operation_direct_production_mode_id: operation.operation_direct_production_mode_id
                            }
                        }).then(r => {
                        i++;

                        if(i === operations.length ) {
                            resolve({
                                success: true,
                            })
                        }
                    })
                }
            })
        })
    }

    updateOrders (req , res , next) {
        let _this= this;
        _this.resolveUpdateOrders(req,res, next).then(result=> {
            res.send(result);
        })
    }

}

module.exports = DirectProductionModeDao;
