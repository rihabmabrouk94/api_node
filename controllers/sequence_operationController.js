const SequenceOperationDao = require('../dao/sequence_operationDao');
var OperationSequenceDaoInst = new SequenceOperationDao();

module.exports =
    {
        update: function (req, res, next) {
            OperationSequenceDaoInst.update(req, res, next);
        },
        get: function (req, res, next) {
            OperationSequenceDaoInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            OperationSequenceDaoInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            OperationSequenceDaoInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            OperationSequenceDaoInst.delete(req, res, next);
        }
    };
