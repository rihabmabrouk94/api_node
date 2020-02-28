const {baseModelDao} = require('./baseModalDao');

class PriorityDao extends baseModelDao {
    constructor() {
        super('priorities', 'id_priority');
        this.baseModal = 'priorities';
        this.primaryKey = 'id_priority';
    }

}

module.exports = PriorityDao;
