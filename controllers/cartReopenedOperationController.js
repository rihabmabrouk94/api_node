const cartReopenedOperations = require('../dao/cartReopenedOperationsDao');
var cartReopenedOperationsInst = new cartReopenedOperations();

module.exports =
    {
        update: function (req, res, next) {
            cartReopenedOperationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            cartReopenedOperationsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            cartReopenedOperationsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            cartReopenedOperationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            cartReopenedOperationsInst.delete(req, res, next);
        }
    };
