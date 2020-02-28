const BreakTypeCategories = require('../dao/break_type_categorieDao');
var breakTypeCategoriesInst = new BreakTypeCategories();

module.exports =
    {
        update: function (req, res, next) {
            breakTypeCategoriesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            breakTypeCategoriesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            breakTypeCategoriesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            breakTypeCategoriesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            breakTypeCategoriesInst.delete(req, res, next);
        }
    };
