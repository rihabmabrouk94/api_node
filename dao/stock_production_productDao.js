const {baseModelDao} = require('./baseModalDao');

class StockProductionProductDao extends baseModelDao {
    constructor() {
        super('stock_production_products', 'stock_production_product_id');
        this.baseModal = 'stock_production_products';
        this.primaryKey = 'stock_production_product_id';
    }

    findStockById(req, res, next) {
        let _this = this;
        let stock_production_product_id = req.params.stock_production_product_id;
        _this.db['stock_production_products'].findOne({
            include: [
                {
                    model: _this.db['production_products']
                },
                {
                    model: _this.db['production_product_providers']
                }

            ],
            where: {
                stock_production_product_id: stock_production_product_id
            }
        })
            .then(stock_production_products => {
                    if (stock_production_products) {
                        res.json({
                            data: stock_production_products,
                            success: true,
                            status: 200
                        })
                    } else {
                        res.json({
                            data: null,
                            success: false,
                            status: 500
                        })
                    }
                }
            ).catch(err =>
            res.status(500).json(err)
        )
    }


    multipleStock(req, res, next) {
        let _this = this;

        var stock_production_products = req.body.stock_production_products;

        var pro= []

        let i = 0;
        stock_production_products.forEach(function (stock_production_product) {

            var stock_production_products = _this.db['stock_production_products'].build(stock_production_product);

            stock_production_products.save().then(function (stock_production_product1) {

                _this.db['stock_production_products'].findOne({
                  where : {
                      stock_production_product_id : stock_production_product1.stock_production_product_id
                  },
                    include: [
                        {
                            model : _this.db['production_products']
                        }
                    ]
                }).then(newStock => {

                    pro.push(newStock);

                    if ( i === req.body.stock_production_products.length -1 ) {

                        res.json({
                            success: true,
                            data: {
                                stock_production_products: pro,
                            },
                            messages: [{
                                userMessage: "stock_production_product created with success",
                                internalMessage: 'stock_production_product created with success',
                                code: 8000,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                            }],
                            attributes: [],
                            status: 200
                        });
                        return;

                    }

                    i++;
                })

            })
        });
    }
}

module.exports = StockProductionProductDao;
