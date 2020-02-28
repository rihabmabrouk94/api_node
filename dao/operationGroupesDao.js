const {baseModelDao} = require('./baseModalDao');

class operationGroupesDao extends baseModelDao {
    constructor() {
        super('operation_groupes', 'operation_groupe_id');
        this.baseModal = 'operation_groupes';
        this.primaryKey = 'operation_groupe_id';
    }

}

module.exports = operationGroupesDao;
