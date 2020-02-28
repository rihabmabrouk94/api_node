const {baseModelDao} = require('./baseModalDao');

class ReportDao extends baseModelDao {
    constructor() {
        super('reports', 'report_id');
        this.baseModal = 'reports';
        this.primaryKey = 'report_id';
    }

}

module.exports = ReportDao;
