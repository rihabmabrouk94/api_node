const MachineParams = require('../dao/machine_paramsDao');
var machine_paramsInst = new MachineParams();

module.exports =
    {
        update: function (req, res, next) {
            machine_paramsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            machine_paramsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            machine_paramsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            machine_paramsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            machine_paramsInst.delete(req, res, next);
        },
        generateWork: function (req, res, next) {
            machine_paramsInst.generateWork(req, res, next);
        }
    };
