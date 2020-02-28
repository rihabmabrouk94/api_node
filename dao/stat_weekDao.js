const {baseModelDao} = require('./baseModalDao');

class StatWeekDao extends baseModelDao {
    constructor() {
        super('stat_weeks', 'stat_week_id');
        this.baseModal = 'stat_weeks';
        this.primaryKey = 'stat_week_id';
    }

}

module.exports = StatWeekDao;
