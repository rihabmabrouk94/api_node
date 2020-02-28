const {baseModelDao} = require('./baseModalDao');

class OperationDirectProductionModeDao extends baseModelDao {
    constructor() {
        super('operation_direct_production_mode_id', 'operation_direct_production_modes');
        this.baseModal = 'operation_direct_production_modes';
        this.primaryKey = 'operation_direct_production_mode_id';
    }

}

module.exports = OperationDirectProductionModeDao;
