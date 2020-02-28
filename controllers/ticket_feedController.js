const TicketFeeds = require('../dao/ticket_feedDao');
var ticket_feedsInst = new TicketFeeds();

module.exports =
    {
        update: function (req, res, next) {
            ticket_feedsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ticket_feedsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            ticket_feedsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            ticket_feedsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            ticket_feedsInst.delete(req, res, next);
        },
        insert_ticket_feed: function (req, res, next) {
            ticket_feedsInst.insert_ticket_feed(req, res, next);
        },
        openTicketFeed: function (req, res, next) {
            ticket_feedsInst.openTicketFeed(req, res, next);
        }
    };
