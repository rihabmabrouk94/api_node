const Profiles = require('../dao/profileDao');
var profilesInst = new Profiles();

module.exports =
    {
        update: function (req, res, next) {
            profilesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            profilesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            profilesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            profilesInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'profiles' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.profile_id) {
                    dbModelItem.count(
                        {
                            where: {
                                profile_id: params.id,
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
                        messages:'Cant delete profile',
                        models: modalArray
                    })
                } else {
                    profilesInst.delete(req, res, next);
                }
            });

        },
        getProfiles: function (req, res, next) {
            profilesInst.getProfiles(req, res, next)
        }
    };
