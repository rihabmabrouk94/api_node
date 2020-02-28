const Receipts = require('../dao/receiptDao');
var receiptInst = new Receipts();

module.exports =
    {
        update: function (req, res, next) {
            receiptInst.update(req, res, next);
        },
        get: function (req, res, next) {
            receiptInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            receiptInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            receiptInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            receiptInst.delete(req, res, next);
        }
    };
