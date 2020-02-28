const {baseModelDao} = require('./baseModalDao');

class StatHourDao extends baseModelDao {
    constructor() {
        super('stat_hours', 'stat_hour_id');
        this.baseModal = 'stat_hours';
        this.primaryKey = 'stat_hour_id';
    }

}

module.exports = StatHourDao;
