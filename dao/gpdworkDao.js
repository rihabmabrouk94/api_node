const {baseModelDao} = require('./baseModalDao');

class GpdworkDao extends baseModelDao {
    constructor() {
        super('gpdworks', 'gpdwork_id');
        this.baseModal = 'gpdworks';
        this.primaryKey = 'gpdwork_id';
    }

}

module.exports = GpdworkDao;
