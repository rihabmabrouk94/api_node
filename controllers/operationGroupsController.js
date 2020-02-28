const operationGroupes = require('../dao/operationGroupesDao');
var operationGroupesInst = new operationGroupes();

module.exports =
    {
        update: function (req, res, next) {
            operationGroupesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            operationGroupesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            operationGroupesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            operationGroupesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            operationGroupesInst.delete(req, res, next);
        }
    };
