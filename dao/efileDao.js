const {baseModelDao} = require('./baseModalDao');

class EfileDao extends baseModelDao {
    constructor() {
        super('efiles', 'file_id');
        this.baseModal = 'efiles';
        this.primaryKey = 'file_id';
    }
}

module.exports = EfileDao;
