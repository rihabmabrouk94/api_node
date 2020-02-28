const {baseModelDao} = require('./baseModalDao');

class StatusUserDao extends baseModelDao {
    constructor() {
        super('status_users', 'user_statusid');
        this.baseModal = 'status_users';
        this.primaryKey = 'user_statusid';
    }

}

module.exports = StatusUserDao;