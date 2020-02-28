const {baseModelDao} = require('./baseModalDao');

class ImportLogDao extends baseModelDao {
    constructor() {
        super('import_logs', 'import_log_id');
        this.baseModal = 'import_logs';
        this.primaryKey = 'import_log_id';
    }

}

module.exports = ImportLogDao;
