const StatInsts = require('../dao/stat_instDao');
var stat_instsInst = new StatInsts();

module.exports =
    {
        update: function (req, res, next) {
            stat_instsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            stat_instsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            stat_instsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            stat_instsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            stat_instsInst.delete(req, res, next);
        }
    };
