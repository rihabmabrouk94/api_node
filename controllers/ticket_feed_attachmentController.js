const TicketFeedAttachments = require('../dao/ticket_feed_attachmentDao');
var ticket_feed_attachmentsInst = new TicketFeedAttachments();

module.exports =
    {
        update: function (req, res, next) {
            ticket_feed_attachmentsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            ticket_feed_attachmentsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            ticket_feed_attachmentsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            ticket_feed_attachmentsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            ticket_feed_attachmentsInst.delete(req, res, next);
        }
    };
