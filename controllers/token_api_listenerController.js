const TokenApiListeners = require('../dao/token_api_listenerDao');
var token_api_listenersInst = new TokenApiListeners();

module.exports =
    {
        update: function (req, res, next) {
            token_api_listenersInst.update(req, res, next);
        },
        get: function (req, res, next) {
            token_api_listenersInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            token_api_listenersInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            token_api_listenersInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            token_api_listenersInst.delete(req, res, next);
        }
    };
