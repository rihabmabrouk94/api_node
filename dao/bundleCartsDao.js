const {baseModelDao} = require('./baseModalDao');

class BundleCartsDao extends baseModelDao {
    constructor() {
        super('bundle_carts', 'bundle_cart_id');
        this.baseModal = 'bundle_carts';
        this.primaryKey = 'bundle_cart_id';
    }

}

module.exports = BundleCartsDao;
