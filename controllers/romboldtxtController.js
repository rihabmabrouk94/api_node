const Romboldtxts = require('../dao/romboldtxtDao');
var romboldtxtsInst = new Romboldtxts();

module.exports =
    {
        update: function (req, res, next) {
            romboldtxtsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            romboldtxtsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            romboldtxtsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            romboldtxtsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            romboldtxtsInst.delete(req, res, next);
        }
    };
