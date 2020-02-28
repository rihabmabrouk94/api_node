const {baseModelDao} = require('./baseModalDao');

class StatusMaintenanceDao extends baseModelDao {
    constructor() {
        super('status_maintenances', 'status_maintenance_id');
        this.baseModal = 'status_maintenances';
        this.primaryKey = 'status_maintenance_id';
    }

}

module.exports = StatusMaintenanceDao;
