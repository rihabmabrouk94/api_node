const ErpSections = require('../dao/erp_sectionDao');
var erp_sectionsInst = new ErpSections();

module.exports =
    {
        update: function (req, res, next) {
            erp_sectionsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            erp_sectionsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            erp_sectionsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            erp_sectionsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            erp_sectionsInst.delete(req, res, next);
        }
    };
