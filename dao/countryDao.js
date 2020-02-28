const {baseModelDao} = require('./baseModalDao');

class CountryDao extends baseModelDao {
    constructor() {
        super('countries', 'country_id');
        this.baseModal = 'countries';
        this.primaryKey = 'country_id';
    }


}

module.exports = CountryDao;
