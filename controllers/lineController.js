const Lines = require('../dao/lineDao');
var linesInst = new Lines();

module.exports =
    {
        update: function (req, res, next) {
            linesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            linesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            linesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            linesInst.save(req, res, next);
        },
        delete: function (req, res, next) {

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray= [];
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'lines' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.line_id) {
                    dbModelItem.count(
                        {
                            where: {
                                line_id: params.id,
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
                    linesInst.delete(req, res, next);
                }
            });
        },
        getlinesbysite: function (req, res, next) {
            linesInst.getlinesbysite(req, res, next);},
        getBoxByLine: function (req, res, next) {
            linesInst.getBoxByLine(req, res, next);
        },
        getArticleByLine: function (req, res, next) {
            linesInst.getArticleByLine(req, res, next);
        }
    };
