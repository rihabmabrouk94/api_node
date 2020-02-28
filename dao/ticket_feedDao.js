const {baseModelDao} = require('./baseModalDao');

class TicketFeedDao extends baseModelDao {
    constructor() {
        super('ticket_feeds', 'ticket_feed_id');
        this.baseModal = 'ticket_feeds';
        this.primaryKey = 'ticket_feed_id';
    }

    insert_ticket_feed(req, res, next) {
        let _this = this;
        _this.db['ticket_structures'].findOne({
            where: {
                subject: req.body.subject
            }
        }).then((ticket_structures) => {
            if (ticket_structures) {
                var ticket_feed = _this.db['ticket_feeds'].build(req.body);


                ticket_feed.ticket_id = ticket_structures.id;
                ticket_feed.comment = req.body.comment;
                ticket_feed.status_id = req.body.status_id;
                ticket_feed.owner_id = req.body.owner_id;
                ticket_feed.department_id = req.body.department_id;
                // ticket_feed.image_id = req.body.image_id;
                ticket_feed.created_at = new Date();


                ticket_feed.save().then(ticket_feeds => {


                    if (ticket_feeds) {
                        var ticket_feed_attachment = _this.db['ticket_feed_attachments'].build({

                            ticket_feed_id: ticket_feeds.ticket_feed_id,
                            file_id: ticket_feeds.image_id,
                            created_at: new Date()
                        });
                        ticket_feed_attachment.save().then(ticket_feed_attachments => {

                            if (ticket_feed_attachments) {
                                res.json({
                                    success: true,
                                    data: {
                                        ticket_feeds: ticket_feeds,
                                        ticket_feed_attachments: ticket_feed_attachments,
                                    },
                                    messages: [{
                                        userMessage: "Ticket Feed created with success",
                                        internalMessage: 'Ticket Feed created with success',
                                        code: 8000,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            }
                        })
                    }
                })
            }
        })
    }


    openTicketFeed(req, res, next) {
        let _this = this;

        var department_id = req.body.department_id;
        if (department_id === '' || department_id === undefined) {
              department_id = null
        } else {
              department_id = req.body.department_id;
        }

        var owner_id = req.body.owner_id;
        if (owner_id === '' || owner_id === undefined) {
            owner_id = null
        } else {
            owner_id = req.body.owner_id;
        }


        _this.db['ticket_structures'].findOne({
            where:{
                id: req.body.ticket_id
            }
        }).then((ticket_structures) => {
            if (ticket_structures) {
                        var ticket_feed = _this.db['ticket_feeds'].build(req.body);
                        ticket_feed.ticket_id = ticket_structures.id;
                        ticket_feed.comment = req.body.comment;
                        ticket_feed.status_id = req.body.status_id;
                        ticket_feed.owner_id = owner_id;
                        ticket_feed.department_id = department_id;
                        ticket_feed.created_at = new Date();
                        ticket_feed.save().then(ticket_feeds => {
                            if (ticket_feeds) {
                                let files = req.body.files;
                                if (files) {
                                    files.forEach(function (file_id) {
                                        file_id.ticket_feed_id = ticket_feeds.ticket_feed_id;
                                        file_id.created_at = new Date();
                                        var ticket_feed_attachments = _this.db['ticket_feed_attachments'].build(file_id);
                                        ticket_feed_attachments.save().then(function (ticket_attachment) {
                                        })
                                    });
                                }

                                res.json({
                                    success: true,
                                    messages: [{
                                        userMessage: "Ticket Feed created with success",
                                        internalMessage: 'Ticket Feed created with success',
                                        code: 8000,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8000"
                                    }],
                                    attributes: [],
                                    status: 200
                                });
                            } else {
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: [{
                                        userMessage: "Ticket Feed not created",
                                        internalMessage: 'Ticket Feed not created',
                                        code: 8001,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8001"
                                    }],
                                    attributes: [],
                                    status: 500
                                });
                            }
                        })



            }
        })
    }


}

module.exports = TicketFeedDao;
