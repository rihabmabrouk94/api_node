const {baseModelDao} = require('./baseModalDao');

class StatusMachineDao extends baseModelDao {
    constructor() {
        super('status_machines', 'sm_id');
        this.baseModal = 'status_machines';
        this.primaryKey = 'sm_id';
    }

}

module.exports = StatusMachineDao;