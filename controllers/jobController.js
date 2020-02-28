const Jobs = require('../dao/jobDao');
var jobsInst = new Jobs();

module.exports =
    {
        update: function (req, res, next) {
            jobsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            jobsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            jobsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            jobsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            jobsInst.delete(req, res, next);
        }
    };
