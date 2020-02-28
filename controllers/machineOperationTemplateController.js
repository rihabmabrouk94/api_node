const MachineOperationTemplates = require('../dao/machineOperationTemplateDao');
var machineOperationTemplatesInst = new MachineOperationTemplates();

module.exports =
    {
        update: function (req, res, next) {
            machineOperationTemplatesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            machineOperationTemplatesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            machineOperationTemplatesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            machineOperationTemplatesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            machineOperationTemplatesInst.delete(req, res, next);
        },
        getOperationTemplateList: function (req, res, next) {
            machineOperationTemplatesInst.getOperationTemplateList(req, res, next);
        },
        getOperationTemplate: function (req, res, next) {
            machineOperationTemplatesInst.getOperationTemplate(req, res, next);
        },
        updateMachineOperationTemplate: function (req, res, next) {
            machineOperationTemplatesInst.updateMachineOperationTemplate(req, res, next);
        },
        getOperationList: function (req, res, next) {
            machineOperationTemplatesInst.getOperationList(req, res, next);
        },
        getOperationList_others: function (req,res ,next ) {
            machineOperationTemplatesInst.getOperationList_others(req, res, next);
        }
    };
