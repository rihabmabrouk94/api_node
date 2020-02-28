const StatMonths = require('../dao/stat_monthDao');
var stat_monthsInst = new StatMonths();

module.exports =
    {
        update: function (req, res, next) {
            stat_monthsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_monthsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_monthsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_monthsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_monthsInst.delete(req, res, next);
        }
    };
