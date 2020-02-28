const Workfiles = require('../dao/workfileDao');
var workfilesInst = new Workfiles();

module.exports =
    {
        update: function (req, res, next) {
            workfilesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            workfilesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            workfilesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            workfilesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            workfilesInst.delete(req, res, next);
        }
    };
