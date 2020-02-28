const cartPendingOperations = require('../dao/cartPendingOperationsDao');
var cartPendingOperationsInst = new cartPendingOperations();

module.exports =
    {
        update: function (req, res, next) {
            cartPendingOperationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            cartPendingOperationsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            cartPendingOperationsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            cartPendingOperationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            cartPendingOperationsInst.delete(req, res, next);
        },
        getOperationsByRFID: function(req, res, next) {
            cartPendingOperationsInst.getOperationsByRFID(req, res, next);
        },
        getCPSByOperator: function (req, res, next) {
            cartPendingOperationsInst.getCPSByOperator(req, res, next);
        },
        quantity_operation_by_hour: function(req, res, next) {
            cartPendingOperationsInst.quantity_operation_by_hour(req, res, next);
        },
        produced_quantity_day: function(req, res, next ) {
            cartPendingOperationsInst.produced_quantity_day(req, res, next )
        },
        saveBundles: function(req, res , next) {
            cartPendingOperationsInst.saveBundles(req, res, next);
        },
        generateBundle: function(req, res, next) {
            cartPendingOperationsInst.saveBundle(req, res, next);
        }


    };
