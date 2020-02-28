const bundleCarts = require('../dao/bundleCartsDao');
var bundleCartsInst = new bundleCarts();

module.exports =
    {
        update: function (req, res, next) {
            bundleCartsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            bundleCartsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            bundleCartsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            bundleCartsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            bundleCartsInst.delete(req, res, next);
        }
    };
