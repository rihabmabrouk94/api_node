const Priorities = require('../dao/priorityDao');
var prioritiesInst = new Priorities();

module.exports =
    {
        update: function (req, res, next) {
            prioritiesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            prioritiesInst.find(req, res, next);
        },
        save: function (req, res, next) {
            prioritiesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            prioritiesInst.delete(req, res, next);
        }
    };
