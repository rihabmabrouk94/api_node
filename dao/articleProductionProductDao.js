const {baseModelDao} = require('./baseModalDao');

class ArticleProductionProductDao extends baseModelDao {
    constructor() {
        super('article_production_products', 'article_production_product_id');
        this.baseModal = 'article_production_products';
        this.primaryKey = 'article_production_product_id';
    }

    addProducts(req, res, next) {
        let body = req.body;
        let _this = this;
        if (body.article_id === null || body.article_id === '') {

            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Article ID not provided',
                        internalMessage: 'Article ID not provided',
                        code: 14000
                    }
                ]
            });
            return;
        }

        let i = 0;

        return new Promise(function (resolve, reject) {
            body.products.forEach(function (product) {

                _this.db['article_production_products'].build({
                    quantity: product.quantity,
                    article_id: body.article_id,
                    production_product_id: product.production_product_id,
                    active: 'Y'
                }).save().then(article_production_productsSaved => {

                    i++;

                    if (i === body.products.length) {
                        resolve({
                            data: body.products
                        });
                        res.send({
                            data: body.products
                        })
                    }

                })
            });
        })
    }

    getProducts(req, res, next) {
        let _this = this;
        let article_id = req.params.article_id;

        if (article_id === null || article_id === '') {

            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Article ID not provided',
                        internalMessage: 'Article ID not provided',
                        code: 14000
                    }
                ]
            });
            return;
        }
        _this.db['article_production_products'].findAll({
            where: {
                article_id: article_id,
                active: 'Y'
            },
            include: [
                {
                    model: _this.db['articles']
                },
                {
                    model: _this.db['production_products']
                }
            ]
        }).then(articleProductionProducts => {
            res.send({
                data: articleProductionProducts,
                success: true
            });
        })
    }

    updateProducts(req, res, next) {
        let _this = this;
        let body = req.body;

        // save or update
        _this. saveOrUpdateProduct(body.products, body.article_id).then(resultSaveOrUpdate => {

            // delete
            _this.db['article_production_products'].findAll({
                where: {
                    article_id: body.article_id,
                    active: 'Y'
                }
            }).then(oldsArticleProducts => {

                _this.checkDeleteProduct(oldsArticleProducts, body.products).then(r=> {
                    res.send({
                        success: true
                    });
                });

            })

        });
    }

    checkProduct(oldProduct, newProducts) {
        let _this = this;
        let i = 0;
        return new Promise(function (resolve, reject) {
            let v = false;
            if (newProducts.length === 0 || !newProducts ) {
                resolve(false);
            }
            newProducts.forEach(function(newProduct) {

                if (newProduct.article_production_product_id === oldProduct.article_production_product_id) {
                    v = true;
                }
                i++;

                if (i === newProducts.length || v === true) {

                    resolve(v)
                }
                v = false
            });
        })
    }

    checkDeleteProduct(oldsArticleProducts, newProducts) {
        let _this= this;
        return new Promise(function (resolve, reject) {
            let i =0 ;
            oldsArticleProducts.forEach(function(oldProduct) {
                _this.checkProduct(oldProduct, newProducts).then(resultCheckProduct => {
                    if (resultCheckProduct === false ) {
                        _this.db['article_production_products'].update({active: 'N'}, {where: {article_production_product_id: oldProduct.article_production_product_id}}).then(result => {
                                                });
                    }
                    i++ ;

                    if (i=== oldsArticleProducts.length) {
                        resolve(resultCheckProduct);
                    }
                });
            });
        });
    }


    saveOrUpdateProduct(products, article_id) {
        let _this= this;
        let i=0;
        return new Promise(function (resolve, reject) {
            if (products.length === 0 ) {
                resolve(false);
            }
            products.forEach(function(newProduct) {

                let v = false;

                newProduct.article_id = article_id
                if (newProduct.article_production_product_id === '' || newProduct.article_production_product_id === null || newProduct.article_production_product_id === undefined) {
                    _this.db['article_production_products'].build(newProduct).save().then(newProductSaved => {

                    })
                }
                else {
                    _this.db['article_production_products'].update(newProduct, {where: {article_production_product_id: newProduct.article_production_product_id}}).then(result => {

                    })
                }
                i++;
                if (i === products.length ) {
                    resolve(true);
                }

            });
        })
    }

    findProduct(id, products) {
        let v = false;
        return new Promise(function (resolve, reject) {
            if (products.length === 0) {
                resolve(false)
            }

            let i = 0;
            products.forEach(function (product) {
                if (product.production_product_id === id) {
                    resolve(true)
                }
                i++;
                if (i === products.length) {
                    resolve(v);
                }
            })
        })
    }

    deleteProducts(req, res, next) {
        let _this= this;
        let id = req.params.article_id;

        _this.db['article_production_products'].update(
            {
                active : 'N'
            },
            {
                where: {
                    article_id: id
                }
            });

        res.send(
            {
                success: true
            });
    }
}

module.exports = ArticleProductionProductDao;
