const StatusTickets = require('../dao/status_ticketDao');
var status_ticketsInst = new StatusTickets();

module.exports =
    {
        update: function (req, res, next) {
            status_ticketsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            status_ticketsInst.find(req, res, next);
        },
        save: function (req, res, next) {
            status_ticketsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            status_ticketsInst.delete(req, res, next);
        }
    };
