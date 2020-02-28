const {baseModelDao} = require('./baseModalDao');

class TokenApiListenerDao extends baseModelDao {
    constructor() {
        super('token_api_listeners', 'token_api_listener_id');
        this.baseModal = 'token_api_listeners';
        this.primaryKey = 'token_api_listener_id';
    }

}

module.exports = TokenApiListenerDao;
