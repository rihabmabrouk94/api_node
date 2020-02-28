const MahineLightStatus = require('../dao/status_machine_lightsDao');
var MahineLightStatusInst = new MahineLightStatus();

module.exports =
    {
        update: function (req, res, next) {
            MahineLightStatusInst.update(req, res, next);
        },
        get: function (req, res, next) {
            MahineLightStatusInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            MahineLightStatusInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            MahineLightStatusInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            MahineLightStatusInst.delete(req, res, next);
        }
    };
