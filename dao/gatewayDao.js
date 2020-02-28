const {baseModelDao} = require('./baseModalDao');

class GatewayDao extends baseModelDao {
    constructor() {
        super('gateways', 'gw_id');
        this.baseModal = 'gateways';
        this.primaryKey = 'gw_id';
    }

}

module.exports = GatewayDao;
