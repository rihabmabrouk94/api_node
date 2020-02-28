const Direct_production_mode= require('../dao/direct_production_modeDao');
var directProductionModeInst = new Direct_production_mode();

module.exports =
    {
        updateObject: function (req, res, next) {
            directProductionModeInst.updateObject(req, res, next);
        },
        get: function (req, res, next) {
            directProductionModeInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            directProductionModeInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            directProductionModeInst.save(req, res, next);
        },
        update: function (req, res, next) {
            directProductionModeInst.update(req, res, next);
        },
        updateObject: function (req, res, next) {
            directProductionModeInst.updateObject(req, res, next);
        },
        getOperationTemplateByDirectProductionMode: function(req, res, next) {
            directProductionModeInst.getOperationTemplateByDirectProductionMode(req, res, next);
        },
        delete: function (req, res, next) {
           // directProductionModeInst.delete(req, res, next);
            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'direct_production_modes' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.direct_production_mode_id) {
                    dbModelItem.count(
                        {
                            where: {
                                direct_production_mode_id: params.id,
                                active: 'Y'
                            }
                        }
                    ).then(result => {
                        if (result > 0) {
                            countModelsHasSite++;
                            modalArray.push(dbModelItem.getTableName()+ ' ');
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
                        messages: 'Cant delete',
                        models: modalArray
                    })
                } else {
                    directProductionModeInst.delete(req, res, next);
                }
            });
        },
        updateOrders: function (req, res, next) {
            directProductionModeInst.updateOrders(req, res, next)
        }


    };
