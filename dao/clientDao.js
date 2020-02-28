const {baseModelDao} = require('./baseModalDao');

class ClientDao extends baseModelDao {
    constructor() {
        super('clients', 'client_id');
        this.baseModal = 'clients';
        this.primaryKey = 'client_id';
    }



}

module.exports = ClientDao;
