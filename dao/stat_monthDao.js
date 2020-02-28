const {baseModelDao} = require('./baseModalDao');

class StatMonthDao extends baseModelDao {
    constructor() {
        super('stat_months', 'stat_month_id');
        this.baseModal = 'stat_months';
        this.primaryKey = 'stat_month_id';
    }

}

module.exports = StatMonthDao;
