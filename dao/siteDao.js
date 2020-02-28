const {baseModelDao} = require('./baseModalDao');

class SiteDao extends baseModelDao {
    constructor() {
        super('sites', 'site_id');
        this.baseModal = 'sites';
        this.primaryKey = 'site_id';
    }

}

module.exports = SiteDao;