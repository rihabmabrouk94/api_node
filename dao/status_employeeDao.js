const {baseModelDao} = require('./baseModalDao');

class StatusEmployeeDao extends baseModelDao {
    constructor() {
        super('status_employees', 'empstatus_id');
        this.baseModal = 'status_employees';
        this.primaryKey = 'empstatus_id';
    }

}

module.exports = StatusEmployeeDao;