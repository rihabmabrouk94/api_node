const MachineEventTypeDao = require('../dao/machineEventTypesDao');
var MachineEventTypeDaoInst = new MachineEventTypeDao();

module.exports =
    {
        update: function (req, res, next) {
            MachineEventTypeDaoInst.update(req, res, next);
        },
        get: function (req, res, next) {
            MachineEventTypeDaoInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            MachineEventTypeDaoInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            MachineEventTypeDaoInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            MachineEventTypeDaoInst.delete(req, res, next);
        },
        updateObject: function (req, res, next) {
            MachineEventTypeDaoInst.updateObject(req, res, next);
        },
        findById: function(req, res, next) {
            MachineEventTypeDaoInst.findByEncodeId(req,res , next);
        },
    };
