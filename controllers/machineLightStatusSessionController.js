const MachineLightStatusSession = require('../dao/machineLightStatusSessionDao');
var MachineLightStatusSessionInst = new MachineLightStatusSession();

module.exports =
    {
        update: function (req, res, next) {
            MachineLightStatusSessionInst.update(req, res, next);
        },
        get: function (req, res, next) {
            MachineLightStatusSessionInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            MachineLightStatusSessionInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            MachineLightStatusSessionInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            MachineLightStatusSessionInst.delete(req, res, next);
        }
    };
