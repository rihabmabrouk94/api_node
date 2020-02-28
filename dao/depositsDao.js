const {baseModelDao} = require('./baseModalDao');

class DepositsDao extends baseModelDao {
    constructor() {
        super('deposits', 'deposit_id');
        this.baseModal = 'deposits';
        this.primaryKey = 'deposit_id';
    }

}

module.exports = DepositsDao;
