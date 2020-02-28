const {baseModelDao} = require('./baseModalDao');

class MachineEventTypeDao extends baseModelDao {
    constructor() {
        super('machine_event_types', 'machine_event_type_id');
        this.baseModal = 'machine_event_types';
        this.primaryKey = 'machine_event_type_id';
    }

}

module.exports = MachineEventTypeDao;
