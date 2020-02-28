const LineArticles = require('../dao/line_articleDao');
var lineArticlesInst = new LineArticles();

module.exports =
    {
        update: function (req, res, next) {
            lineArticlesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            lineArticlesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            lineArticlesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            lineArticlesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            lineArticlesInst.delete(req, res, next);
        }
    };
