const {baseModelDao} = require('./baseModalDao');

class EventDao extends baseModelDao {
    constructor() {
        super('events', 'event_id');
        this.baseModal = 'events';
        this.primaryKey = 'event_id';
    }

}

module.exports = EventDao;
