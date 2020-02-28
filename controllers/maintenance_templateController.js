const MaintenanceTemplates = require('../dao/maintenance_templateDao');
var maintenance_templatesInst = new MaintenanceTemplates();

module.exports =
    {
        update: function (req, res, next) {
            maintenance_templatesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            maintenance_templatesInst.find(req, res, next);
        },
        save: function (req, res, next) {
            maintenance_templatesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            maintenance_templatesInst.delete(req, res, next);
        },
        getByDepartement: function (req, res, next) {
            maintenance_templatesInst.getByDepartement(req, res, next);
        },
        findById: function(req, res, next) {
            maintenance_templatesInst.findByEncodeId(req,res , next);
        },
        updateObject: function (req, res, next) {
            maintenance_templatesInst.updateObject(req, res, next);
        },
        getByDepartementbtmachine_Type: function (req, res, next) {
            maintenance_templatesInst.getByDepartementbtmachine_Type(req, res, next);
        },
    };
