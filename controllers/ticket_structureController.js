const TicketStructures = require('../dao/ticket_structureDao');
var ticket_structuresInst = new TicketStructures();

module.exports =
    {
        update: function (req, res, next) {
            ticket_structuresInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ticket_structuresInst.find(req, res, next);
        },
        save: function (req, res, next) {
            ticket_structuresInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            ticket_structuresInst.delete(req, res, next);
        },
        getOperationByLine: function (req, res, next) {
            ticket_structuresInst.getOperationByLine(req, res, next);
        },
        insert_ticket: function (req, res, next) {
            ticket_structuresInst.insert_ticket(req, res, next);
        },
        findTicketFeedById: function (req, res, next) {
            ticket_structuresInst.findTicketFeedById(req, res, next);
        },
        getTicketByLine: function (req, res, next) {
            ticket_structuresInst.getTicketByLine(req, res, next);
        },
        multiOpen: function (req, res, next) {
            ticket_structuresInst.multiOpen(req, res, next);
        },
        openTicket: function (req, res, next) {
            ticket_structuresInst.openTicket(req, res, next);
        },
        getTicketFeedByTicket: function (req, res, next) {
            ticket_structuresInst.getTicketFeedByTicket(req, res, next);
        }
    };
