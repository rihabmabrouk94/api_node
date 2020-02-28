const StatusMaintenances = require('../dao/status_maintenanceDao');
var status_maintenancesInst = new StatusMaintenances();

module.exports =
    {
        update: function (req, res, next) {
            status_maintenancesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            status_maintenancesInst.find(req, res, next);
        },
        save: function (req, res, next) {
            status_maintenancesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            status_maintenancesInst.delete(req, res, next);
        }
    };
