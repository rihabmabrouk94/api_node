const Has_permissions = require('../dao/has_permissionsDao');
var has_permissionsInst = new Has_permissions();


module.exports =
    {
        update: function (req, res, next) {
            has_permissionsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            has_permissionsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            has_permissionsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            has_permissionsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            has_permissionsInst.delete(req, res, next);
        },
        updateHasPermission : function(req,res,next) {
            has_permissionsInst.updateHasPermission(req,res,next);
        }

    };
