const Bundles = require('../dao/bundleDao');
var bundlesInst = new Bundles();

module.exports =
    {
        update: function (req, res, next) {
            bundlesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            bundlesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            bundlesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            bundlesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            bundlesInst.delete(req, res, next);
        },
        infoBundleAction: function (req, res, next) {
            bundlesInst.infoBundleAction(req, res, next);
        },
        saveBundles: function (req, res, next) {
            bundlesInst.saveBundles(req, res, next);
        },
        infoBundleByIDAction: function (req, res, next) {
            bundlesInst.infoBundleByIDAction(req, res, next);
        },
        infoCartPendingOperationAction: function (req, res, next) {
            bundlesInst.infoCartPendingOperationAction(req, res, next);
        },
        findBundleById: function (req, res, next) {
            bundlesInst.findBundleById(req, res, next);
        },
        infoBundleByID: function (req, res, next) {
            bundlesInst.infoBundleByID(req, res, next);
        },
        codeBundles: function(req, res, next) {
            bundlesInst.codeBundles(req ,res , next)
        }
    };
