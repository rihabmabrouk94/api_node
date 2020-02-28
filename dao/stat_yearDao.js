const {baseModelDao} = require('./baseModalDao');

class StatYearDao extends baseModelDao {
    constructor() {
        super('stat_years', 'stat_year_id');
        this.baseModal = 'stat_years';
        this.primaryKey = 'stat_year_id';
    }

}

module.exports = StatYearDao;
