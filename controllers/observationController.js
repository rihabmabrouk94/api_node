const Observations = require('../dao/observationDao');
var observationsInst = new Observations();

module.exports =
    {
        update: function (req, res, next) {
            observationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            observationsInst.find(req, res, next);
        },
        save: function (req, res, next) {
            observationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            observationsInst.delete(req, res, next);
        },
        findTicketByObservation: function (req, res, next) {
            observationsInst.findTicketByObservation(req, res, next);
        },
        findObservation: function (req, res, next) {
            observationsInst.findObservation(req, res, next);
        },
    };
