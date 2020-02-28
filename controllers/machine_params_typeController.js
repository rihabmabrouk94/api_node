const MachineParamsTypes = require('../dao/machine_params_typeDao');
var machine_params_typesInst = new MachineParamsTypes();

module.exports =
    {
        update: function (req, res, next) {
            machine_params_typesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            machine_params_typesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            machine_params_typesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            machine_params_typesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            machine_params_typesInst.delete(req, res, next);
        },
        machineParamsByMachineParamsType: function (req, res, next) {
            machine_params_typesInst.machineParamsByMachineParamsType(req, res, next);
        }
    };
