const StockProductionProducts = require('../dao/stock_production_productDao');
var stockProductionProductInst = new StockProductionProducts();

module.exports =
    {
        update: function (req, res, next) {
            stockProductionProductInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stockProductionProductInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stockProductionProductInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stockProductionProductInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stockProductionProductInst.delete(req, res, next);
        },
        findStockById: function (req, res, next) {
            stockProductionProductInst.findStockById(req, res, next);
        },
        multipleStock: function (req, res, next) {
            stockProductionProductInst.multipleStock(req, res, next);
        }
    };
