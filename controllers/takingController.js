const TakingDao = require('../dao/takingDao');
var TakingInst = new TakingDao();

module.exports =
    {
        update: function (req, res, next) {
            TakingInst.update(req, res, next);
        },
        get: function (req, res, next) {
            TakingInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            TakingInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            TakingInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'takings' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.taking_id) {
                    dbModelItem.count(
                        {
                            where: {
                                taking_id: params.id,
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
                    TakingInst.delete(req, res, next);
                }
            });
        },
        updateObject: function (req, res, next) {
            TakingInst.updateObject(req, res, next);
        },
        ajouterPrelevement: function (req, res, next) {
            TakingInst.ajouterPrelevement(req,res, next);
        },
        annulerPrelevement: function (req, res, next) {
            TakingInst.annulerPrelevement(req,res, next);
        },
        findById: function(req, res, next) {
            TakingInst.findByEncodeId(req,res , next);
        },
        info: function(req, res, next) {
            TakingInst.info(req,res , next);
        },
        updateObject: function (req, res, next) {
            TakingInst.updateObject(req, res, next);
        },
        updateTaking : function(req, res, next) {
            TakingInst.updateTaking(req, res, next);
        }
    };
