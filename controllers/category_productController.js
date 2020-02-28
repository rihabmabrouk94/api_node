const CategoryProductDao = require('../dao/category_productDao');
var CategoryProductInst = new CategoryProductDao();

module.exports =
    {
        update: function (req, res, next) {
            CategoryProductInst.update(req, res, next);
        },
        get: function (req, res, next) {
            CategoryProductInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            CategoryProductInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            CategoryProductInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'category_products' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.category_product_id) {
                    dbModelItem.count(
                        {
                            where: {
                                category_product_id: params.id,
                                active: 'Y'
                            }
                        }
                    ).then(result => {
                        if (result > 0) {
                            countModelsHasSite++;
                            modalArray.push(dbModelItem.getTableName()+ ' ')
                        }
                        callback()
                    });
                } else {
                    callback()
                }
            }, function (err) {
                if (countModelsHasSite) {
                    res.json({
                        success: false,
                        messages:'You cant delete it',
                        models: modalArray
                    })
                } else {
                    CategoryProductInst.delete(req, res, next);
                }
            });
        },
        updateObject: function (req, res, next) {
            CategoryProductInst.updateObject(req, res, next);
        },
        productByCategory: function (req, res, next) {
            CategoryProductInst.productByCategory(req, res, next);
        }
    };
