const EventDao = require('../dao/eventsDao');

var EventDaoInst = new EventDao();

module.exports =
    {
        update: function (req, res, next) {
            EventDaoInst.update(req, res, next);
        },
        get: function (req, res, next) {
            EventDaoInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            EventDaoInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            EventDaoInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            EventDaoInst.delete(req, res, next);
        },
    };
