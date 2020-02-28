const Devises = require('../dao/deviseDao');
var devisesInst = new Devises();

module.exports =
    {
        update: function (req, res, next) {
            devisesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            devisesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            devisesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            devisesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            devisesInst.delete(req, res, next);
        }
    };
