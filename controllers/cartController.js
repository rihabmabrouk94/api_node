const Carts = require('../dao/cartDao');
var cartsInst = new Carts();

module.exports =
    {
        update: function (req, res, next) {
            cartsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            cartsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            cartsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            cartsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            cartsInst.delete(req, res, next);
        },
        allRFIDCards: function(req , res , next) {
            cartsInst.allRFIDCards(req, res, next)
        }
    };
