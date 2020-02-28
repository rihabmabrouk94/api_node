const {baseModelDao} = require('./baseModalDao');

class Status_machine_lightsDao extends baseModelDao {
    constructor() {
        super('status_machine_lights', 'status_machine_light_id');
        this.baseModal = 'status_machine_lights';
        this.primaryKey = 'status_machine_light_id';
    }

}

module.exports = Status_machine_lightsDao;
