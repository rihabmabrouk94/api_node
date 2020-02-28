const OperationTemplates = require('../dao/operation_templateDao');
var operationTemplatesInst = new OperationTemplates();

module.exports =
    {
        update: function (req, res, next) {
            operationTemplatesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            operationTemplatesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            operationTemplatesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            operationTemplatesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            operationTemplatesInst.delete(req, res, next);
        },
        getOperationsTemplate: function(req, res, next) {
            operationTemplatesInst.getOperationsTemplate(req, res, next)
        }
    };
