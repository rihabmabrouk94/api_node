var db = require('../models');

const Sites = require('../dao/siteDao');
var sitesInst = new Sites();
var sitesByClients = function (req, res, next) {
    db.sites.findAll(
        {
            where: {
                client_id: req.params.client_id
            },
            include: [
                {model: db.clients}
            ]
        }
    )
        .then(site => {
            res.json(site);
        })
};
module.exports =
    {
        update: function (req, res, next) {
            sitesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            sitesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            sitesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            sitesInst.save(req, res, next);
        },

        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray =[]
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'sites' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.site_id) {
                    dbModelItem.count(
                        {
                            where: {
                                site_id: params.id,
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
                if (countModelsHasSite>0) {
                    res.json({
                        success: false,
                        messages:'This site exist in ' + modalArray + ', You cant delete it',
                        models: modalArray
                    })
                } else {
                    sitesInst.delete(req, res, next);
                }
            });

        },

        sitesByClients: sitesByClients

    };
