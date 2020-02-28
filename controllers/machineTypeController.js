const MachineType = require('../dao/machineTypeDao');
var MachineTypeInst = new MachineType();

module.exports =
    {
        update: function (req, res, next) {
            MachineTypeInst.update(req, res, next);
        },
        get: function (req, res, next) {
            MachineTypeInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            MachineTypeInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            MachineTypeInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            MachineTypeInst.delete(req, res, next);
        },
        machineParamsTypeByMachineType: function (req, res, next) {
            MachineTypeInst.machineParamsTypeByMachineType(req, res, next);
        }
    };
