const ProductionProductProviderDao = require('../dao/production_product_providersDao');
var ProductionProductProviderInst = new ProductionProductProviderDao();

module.exports =
    {
        update: function (req, res, next) {
            ProductionProductProviderInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ProductionProductProviderInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            ProductionProductProviderInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            ProductionProductProviderInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'production_product_providers' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.production_product_provider_id) {
                    dbModelItem.count(
                        {
                            where: {
                                production_product_provider_id: params.id,
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
                    ProductionProductProviderInst.delete(req, res, next);
                }
            });
        },
        updateObject: function (req, res, next) {
            ProductionProductProviderInst.updateObject(req, res, next);
        }
    };
