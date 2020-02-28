const ProductionProductDao = require('../dao/production_productsDao');
var ProductionProductInst = new ProductionProductDao();

module.exports =
    {
        update: function (req, res, next) {
            ProductionProductInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ProductionProductInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            ProductionProductInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            ProductionProductInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'production_products' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.production_product_id) {
                    dbModelItem.count(
                        {
                            where: {
                                production_product_id: params.id,
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
                    ProductionProductInst.delete(req, res, next);
                }
            });
        },
        updateObject: function (req, res, next) {
            ProductionProductInst.updateObject(req, res, next);
        }
    };
