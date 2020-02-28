const {baseModelDao} = require('./baseModalDao');

class SequenceOperationDao extends baseModelDao {
    constructor() {
        super('sequence_operations', 'sequence_operation_id');
        this.baseModal = 'sequence_operations';
        this.primaryKey = 'sequence_operation_id';
    }
}

module.exports = SequenceOperationDao;
