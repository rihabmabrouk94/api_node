const Lines = require('../dao/operation_direct_production_modeDao');
var operationDirectProductionModeInst = new Lines();

module.exports =
    {
        update: function (req, res, next) {
            operationDirectProductionModeInst.update(req, res, next);
        },
        updateObject: function (req, res, next) {
            operationDirectProductionModeInst.updateObject(req, res, next);
        },
        get: function (req, res, next) {
            operationDirectProductionModeInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            operationDirectProductionModeInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            operationDirectProductionModeInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            operationDirectProductionModeInst.delete(req, res, next);
        }
    };
