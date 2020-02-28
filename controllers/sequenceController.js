const SequenceDao = require('../dao/sequenceDao');
var sequenceInst = new SequenceDao();

module.exports =
    {
        update: function (req, res, next) {
            sequenceInst.update(req, res, next);
        },
        get: function (req, res, next) {
            sequenceInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            sequenceInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            sequenceInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            sequenceInst.delete(req, res, next);
        },
        saveSequences: function (req, res, next) {
            sequenceInst.saveSequences(req, res, next);
        },
        deleteSequences: function (req, res, next) {
            sequenceInst.deleteSequences(req, res, next);
        },
        updateSequences: function(req,res, next){
            sequenceInst.updateSequences(req, res, next);
        }
    };
