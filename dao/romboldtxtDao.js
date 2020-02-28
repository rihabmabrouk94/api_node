const {baseModelDao} = require('./baseModalDao');

class RomboldtxtDao extends baseModelDao {
    constructor() {
        super('romboldtxts', 'romboldtxt_id');
        this.baseModal = 'romboldtxts';
        this.primaryKey = 'romboldtxt_id';
    }

}

module.exports = RomboldtxtDao;
