const {baseModelDao} = require('./baseModalDao');

class ProductionProductProviderDao extends baseModelDao {
    constructor() {
        super('production_product_providers', 'production_product_provider_id');
        this.baseModal = 'production_product_providers';
        this.primaryKey = 'production_product_provider_id';
    }

}

module.exports = ProductionProductProviderDao;
