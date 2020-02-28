var db = require('../models');

const Groups = require('../dao/groupDao');
var groupsInst = new Groups();

var groups_By_Site = function (req, res, next) {
    db.groups.findAll(
        {
            where: {
                site_id: req.params.site_id
            },
            include: [
                {model: db.sites}
            ]
        }
    ).then(group => {
        res.json(group);
    });
};

module.exports =
    {
        update: function (req, res, next) {
            groupsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            groupsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            groupsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            groupsInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'groups' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.group_id) {
                    dbModelItem.count(
                        {
                            where: {
                                group_id: params.id,
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
                    groupsInst.delete(req, res, next);
                }
            });
        },
        groups_By_Site: groups_By_Site
    };
