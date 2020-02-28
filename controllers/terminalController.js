const Terminals = require('../dao/terminalDao');
var terminalsInst = new Terminals();


module.exports =
    {
        update: function (req, res, next) {
            terminalsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            terminalsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            terminalsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            terminalsInst.save(req, res, next);
        },
        delete: function (req, res, next) {


            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'terminals' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.Terminal_id) {
                    dbModelItem.count(
                        {
                            where: {
                                Terminal_id: params.id,
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
                        messages:'Cant delete',
                        models: modalArray
                    })
                } else {
                    terminalsInst.delete(req, res, next);
                }
            });
        }
    };
