const {baseModelDao} = require('./baseModalDao');

class GroupDao extends baseModelDao {
    constructor() {
        super('groups', 'group_id');
        this.baseModal = 'groups';
        this.primaryKey = 'group_id';
    }

}

module.exports = GroupDao;
