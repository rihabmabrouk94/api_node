const MachineEvents = require('../dao/machine_eventsDao');
var MachineEventsInst = new MachineEvents();

module.exports =
    {
        update: function (req, res, next) {
            MachineEventsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            MachineEventsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            MachineEventsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            MachineEventsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            MachineEventsInst.delete(req, res, next);
        },
        getByMachineId: function (req, res, next) {
            MachineEventsInst.getByMachineId(req, res, next);
        },
    };
