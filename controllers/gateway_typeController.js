const GatewayTypes = require('../dao/gateway_typeDao');

var gateway_typesInst = new GatewayTypes();

module.exports =
    {
        update: function (req, res, next) {
            gateway_typesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            gateway_typesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            gateway_typesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            gateway_typesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            gateway_typesInst.delete(req, res, next);
        },
    };
