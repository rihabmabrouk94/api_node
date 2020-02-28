const {baseModelDao} = require('./baseModalDao');

class TicketFeedAttachmentDao extends baseModelDao {
    constructor() {
        super('ticket_feed_attachments', 'id');
        this.baseModal = 'ticket_feed_attachments';
        this.primaryKey = 'id';
    }

}

module.exports = TicketFeedAttachmentDao;
