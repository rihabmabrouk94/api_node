const {baseModelDao} = require('./baseModalDao');

class CategoryProductDao extends baseModelDao {
    constructor() {
        super('category_products', 'category_product_id');
        this.baseModal = 'category_products';
        this.primaryKey = 'category_product_id';
    }

    productByCategory(req, res, next) {
        let _this= this;
        let category_product_id= req.params.category_product_id;
        _this.db['category_products'].findOne({
            where: {
                category_product_id: category_product_id,
                active: 'Y'
            }
        }).then(category_products => {
            if(category_products){
                _this.db['production_products'].findAll({
                    where: {
                        category_product_id: category_products.category_product_id,
                        active: 'Y'
                    },
                    include:[
                        {model: _this.db['category_products']},
                        {model: _this.db['operation_templates']},
                    ]
                }).then(production_products => {

                    if (production_products){
                        res.send({
                            success: true,
                            data: production_products,
                            messages: [
                                {
                                    userMessage: 'Product with success',
                                    internalMessage: 'Product with success',
                                }
                            ]
                        });
                    }else{
                        res.send({
                            success: false,
                            data: null,
                            messages: [
                                {
                                    userMessage: 'Product does not exists',
                                    internalMessage: 'Product does not exists',
                                }
                            ]
                        });
                    }

                })
            }else{
                res.send({
                    success: false,
                    data: null,
                    messages: [
                        {
                            userMessage: 'Category does not exists',
                            internalMessage: 'Category does not exists',
                        }
                    ]
                });
            }

        })
        }
}

module.exports = CategoryProductDao;
