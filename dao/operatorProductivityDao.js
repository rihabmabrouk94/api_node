const {baseModelDao} = require('./baseModalDao');

class operatorProductivityDao extends baseModelDao {
    constructor() {
        super('operatorproductivitys', 'operatorproductivity_id');
        this.baseModal = 'operatorproductivitys';
        this.primaryKey = 'operatorproductivity_id';
    }

}

module.exports = operatorProductivityDao;
