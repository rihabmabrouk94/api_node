const Orders = require('../dao/orderDao');
var ordersInst = new Orders();

module.exports =
    {
        update: function (req, res, next) {
            ordersInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ordersInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            ordersInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            ordersInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            ordersInst.delete(req, res, next);
        },
        deleteBundleOrder: function (req, res, next) {
            ordersInst.deleteBundleOrder(req, res, next);
        },
        get_order_Info: function (req, res, next) {
            ordersInst.get_order_Info(req, res, next);
        },
        codeOrders: function(req, res, next ) {
            ordersInst.codeOrders(req, res, next)
        },

        get_bundles_info_by_order: function(req, res, next ) {
            ordersInst.get_bundles_info_by_order(req, res, next)
        },
        get_order_info_by_size: function(req, res, next ) {
            ordersInst.get_order_info_by_size(req, res, next)
        },
        findByCode: function(req, res, next) {
            ordersInst.findByCode(req, res, next)
        }
    };
