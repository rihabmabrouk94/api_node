const {baseModelDao} = require('./baseModalDao');

class StatInstDao extends baseModelDao {
    constructor() {
        super('stat_insts', 'stat_inst_id');
        this.baseModal = 'stat_insts';
        this.primaryKey = 'stat_inst_id';
    }

}

module.exports = StatInstDao;
