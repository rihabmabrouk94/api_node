const {baseModelDao} = require('./baseModalDao');

class ProductionProductDao extends baseModelDao {
    constructor() {
        super('production_products', 'production_product_id');
        this.baseModal = 'production_products';
        this.primaryKey = 'production_product_id';
    }

}

module.exports = ProductionProductDao;
