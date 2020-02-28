const StatYears = require('../dao/stat_yearDao');
var stat_yearsInst = new StatYears();

module.exports =
    {
        update: function (req, res, next) {
            stat_yearsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_yearsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_yearsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_yearsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_yearsInst.delete(req, res, next);
        }
    };
