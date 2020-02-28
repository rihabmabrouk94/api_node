const {baseModelDao} = require('./baseModalDao');

class ServerDao extends baseModelDao {
    constructor() {
        super('servers', 'server_id');
        this.baseModal = 'servers';
        this.primaryKey = 'server_id';
    }

}

module.exports = ServerDao;