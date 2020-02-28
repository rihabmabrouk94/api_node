const {baseModelDao} = require('./baseModalDao');

class DeviseDao extends baseModelDao {
    constructor() {
        super('devises', 'devise_id');
        this.baseModal = 'devises';
        this.primaryKey = 'devise_id';
    }

}

module.exports = DeviseDao;
