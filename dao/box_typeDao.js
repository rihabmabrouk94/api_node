const {baseModelDao} = require('./baseModalDao');

class BoxTypeDao extends baseModelDao {
    constructor() {
        super('box_types', 'bt_id');
        this.baseModal = 'box_types';
        this.primaryKey = 'bt_id';
    }

}

module.exports = BoxTypeDao;