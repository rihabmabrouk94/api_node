const {baseModelDao} = require('./baseModalDao');

class MachineLightStatusSessionDao extends baseModelDao {
    constructor() {
        super('machine_light_status_sessions', 'machine_light_status_session_id');
        this.baseModal = 'machine_light_status_sessions';
        this.primaryKey = 'machine_light_status_session_id';
    }

}

module.exports = MachineLightStatusSessionDao;
