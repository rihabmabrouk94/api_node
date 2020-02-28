const {baseModelDao} = require('./baseModalDao');

class WorkfileDao extends baseModelDao {
    constructor() {
        super('workfiles', 'workfiles_id');
        this.baseModal = 'workfiles';
        this.primaryKey = 'workfiles_id';
    }

}

module.exports = WorkfileDao;
