const Reports = require('../dao/reportDao');
var reportsInst = new Reports();

module.exports =
    {
        update: function (req, res, next) {
            reportsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            reportsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            reportsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            reportsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            reportsInst.delete(req, res, next);
        }
    };
