const {baseModelDao} = require('./baseModalDao');

class cartReopenedOperationsDao extends baseModelDao {
    constructor() {
        super('cart_reopened_operations', 'cart_reopened_operation_id');
        this.baseModal = 'cart_reopened_operations';
        this.primaryKey = 'cart_reopened_operation_id';
    }

}

module.exports = cartReopenedOperationsDao;
