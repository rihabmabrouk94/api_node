const operatorProductivity = require('../dao/operatorProductivityDao');
var operatorProductivityInst = new operatorProductivity();

module.exports =
    {
        update: function (req, res, next) {
            operatorProductivityInst.update(req, res, next);
        },
        get: function (req, res, next) {
            operatorProductivityInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            operatorProductivityInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            operatorProductivityInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            operatorProductivityInst.delete(req, res, next);
        }
    };
