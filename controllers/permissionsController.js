const Permissions = require('../dao/permissionsDao');
var permissionsInst = new Permissions();

module.exports =
    {
        update: function (req, res, next) {
            permissionsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            permissionsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            permissionsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            permissionsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            permissionsInst.delete(req, res, next);
        }
    };
