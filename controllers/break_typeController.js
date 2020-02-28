const BreakTypes = require('../dao/break_typeDao');
var break_typesInst = new BreakTypes();

module.exports =
    {
        update: function (req, res, next) {
            break_typesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            break_typesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            break_typesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            break_typesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            break_typesInst.delete(req, res, next);
        },
        getBreakList: function (req, res, next) {
            break_typesInst.getBreakList(req, res, next);
        },
    };
