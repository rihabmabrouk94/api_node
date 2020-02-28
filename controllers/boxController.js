const Boxes = require('../dao/boxDao');
var boxsInst = new Boxes();

module.exports =
    {
        update: function (req, res, next) {
            boxsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            boxsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            boxsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            boxsInst.save(req, res, next);
        },
        delete: function (req, res, next) {


            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'boxes' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.box_id) {
                    dbModelItem.count(
                        {
                            where: {
                                box_id: params.id,
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
                    boxsInst.delete(req, res, next);
                }
            });
        },
        MachineAffectAction: function (req, res, next) {
            boxsInst.MachineAffectAction(req, res, next);
        },
        BulkUpdate: function (req, res, next) {
            boxsInst.BulkUpdate(req, res, next);
        }
    };
