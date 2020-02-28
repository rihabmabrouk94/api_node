const {baseModelDao} = require('./baseModalDao');

class StatDayDao extends baseModelDao {
    constructor() {
        super('stat_days', 'stat_day_id');
        this.baseModal = 'stat_days';
        this.primaryKey = 'stat_day_id';
    }

}

module.exports = StatDayDao;
