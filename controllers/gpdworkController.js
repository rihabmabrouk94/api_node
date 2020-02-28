const Gpdworks = require('../dao/gpdworkDao');
var gpdworksInst = new Gpdworks();

module.exports =
    {
        update: function (req, res, next) {
            gpdworksInst.update(req, res, next);
        },
        get: function (req, res, next) {
            gpdworksInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            gpdworksInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            gpdworksInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            gpdworksInst.delete(req, res, next);
        }
    };
