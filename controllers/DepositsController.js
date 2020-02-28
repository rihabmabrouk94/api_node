const DepositsDao = require('../dao/depositsDao');
var DepositsInst = new DepositsDao();

module.exports =
    {
        update: function (req, res, next) {
            DepositsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            DepositsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            DepositsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            DepositsInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'deposits' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.deposit_id) {
                    dbModelItem.count(
                        {
                            where: {
                                deposit_id: params.id,
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
                    DepositsInst.delete(req, res, next);
                }
            });
        },
        updateObject: function (req, res, next) {
            DepositsInst.updateObject(req, res, next);
        }
    };
