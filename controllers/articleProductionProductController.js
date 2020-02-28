const ArticleProductionProduct = require('../dao/articleProductionProductDao');
var articleProductionProductInst = new ArticleProductionProduct();

module.exports =
    {
        update: function (req, res, next) {
            articleProductionProductInst.update(req, res, next);
        },
        get: function (req, res, next) {
            articleProductionProductInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            articleProductionProductInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            articleProductionProductInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            articleProductionProductInst.delete(req, res, next);
        },
        updateObject: function (req, res, next) {
            articleProductionProductInst.updateObject(req, res, next);
        },
        findById: function(req, res, next) {
            articleProductionProductInst.findByEncodeId(req,res , next);
        },
        addProducts: function(req, res, next) {
            articleProductionProductInst.addProducts(req, res, next);
        },
        getProducts: function(req, res, next) {
            articleProductionProductInst.getProducts(req, res, next);
        },
        updateProducts: function (req, res, next) {
            articleProductionProductInst.updateProducts(req, res, next);
        },
        deleteProducts: function (req, res, next) {
            articleProductionProductInst.deleteProducts(req, res, next);
        }
    };
