const {baseModelDao} = require('./baseModalDao');

class StatusTicketDao extends baseModelDao {
    constructor() {
        super('status_tickets', 'id');
        this.baseModal = 'status_tickets';
        this.primaryKey = 'id';
    }

}

module.exports = StatusTicketDao;
