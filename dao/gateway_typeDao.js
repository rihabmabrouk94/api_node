const {baseModelDao} = require('./baseModalDao');

class GatewayTypeDao extends baseModelDao {
    constructor() {
        super('gateway_types', 'gwt_id');
        this.baseModal = 'gateway_types';
        this.primaryKey = 'gwt_id';
    }

}

module.exports = GatewayTypeDao;
