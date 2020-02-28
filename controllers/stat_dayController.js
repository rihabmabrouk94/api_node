const StatDays = require('../dao/stat_dayDao');
var stat_daysInst = new StatDays();

module.exports =
    {
        update: function (req, res, next) {
            stat_daysInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_daysInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_daysInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_daysInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_daysInst.delete(req, res, next);
        }
    };
