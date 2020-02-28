const StatusMachines = require('../dao/status_machineDao');

var status_machinesInst = new StatusMachines();
module.exports =
    {
        update: function (req, res, next) {
            status_machinesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            status_machinesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            status_machinesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            status_machinesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            status_machinesInst.delete(req, res, next);
        },
    };