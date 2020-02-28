const Breaks = require('../dao/breakDao');
var breaksInst = new Breaks();

module.exports =
    {
        update: function (req, res, next) {
            breaksInst.update(req, res, next);
        },
        get: function (req, res, next) {
            breaksInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            breaksInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            breaksInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            breaksInst.delete(req, res, next);
        },
        getBreakListAction: function (req, res, next) {
            breaksInst.getBreakListAction(req, res, next);
        },
        finishBreakAction: function (req, res, next) {
            breaksInst.finishBreakAction(req, res, next);
        },
        getBreaks: function(req, res, next) {
            breaksInst.getBreaks(req, res, next);
        },
        views_employee_breaks_by_day: function (req, res,next) {
            breaksInst.views_employee_breaks_by_day(req, res, next);

        }
    };
