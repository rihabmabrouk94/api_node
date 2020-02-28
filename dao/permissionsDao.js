const {baseModelDao} = require('./baseModalDao');

class PermissionsDao extends baseModelDao {
    constructor() {
        super('permissions', 'permission_id');
        this.baseModal = 'permissions';
        this.primaryKey = 'permission_id';
    }

}

module.exports = PermissionsDao;