const Operations = require('../dao/operationDao');
var operationsInst = new Operations();

module.exports =
    {
        update: function (req, res, next) {
            operationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            operationsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            operationsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            operationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            operationsInst.delete(req, res, next);
        },
        getOperationsListOldAction :  function (req, res, next) {
            operationsInst.getOperationsListOldAction(req, res, next);
        },
        operationFinished: function(req, res, next) {
            operationsInst.operationFinished(req, res, next);
        },
        startOperation: function(req, res, next) {
            operationsInst.startOperation(req, res, next);
        },
        generate_direct_production : function(req, res, next) {
            operationsInst.generate_direct_production(req, res, next);
        },
        getOperationsTemplateByLine: function (req, res, next) {
            operationsInst.getOperationsTemplateByLine(req, res, next);
        },
        resetBundle: function (req, res , next) {
            operationsInst.resetBundle(req, res , next);
        }
    };
