const Articles = require('../dao/articleDao');
var articlesInst = new Articles();

module.exports =
    {
        update: function (req, res, next) {
            articlesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            articlesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            articlesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            articlesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            articlesInst.delete(req, res, next);
        }
    };
