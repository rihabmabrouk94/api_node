const StatWeeks = require('../dao/stat_weekDao');
var stat_weeksInst = new StatWeeks();

module.exports =
    {
        update: function (req, res, next) {
            stat_weeksInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_weeksInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_weeksInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_weeksInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_weeksInst.delete(req, res, next);
        }
    };
