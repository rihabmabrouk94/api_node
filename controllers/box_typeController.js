const BoxTypes = require('../dao/box_typeDao');

var box_typesInst = new BoxTypes();

module.exports =
    {
        update: function (req, res, next) {
            box_typesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            box_typesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            box_typesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            box_typesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            box_typesInst.delete(req, res, next);
        },
    };
