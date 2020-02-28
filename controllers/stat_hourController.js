const StatHours = require('../dao/stat_hourDao');
var stat_hoursInst = new StatHours();

module.exports =
    {
        update: function (req, res, next) {
            stat_hoursInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_hoursInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_hoursInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_hoursInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_hoursInst.delete(req, res, next);
        }
    };
