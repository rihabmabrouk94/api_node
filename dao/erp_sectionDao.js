const {baseModelDao} = require('./baseModalDao');

class ErpSectionDao extends baseModelDao {
    constructor() {
        super('erp_sections', 'esec_id');
        this.baseModal = 'erp_sections';
        this.primaryKey = 'esec_id';
    }

}

module.exports = ErpSectionDao;