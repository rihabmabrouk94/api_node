const {baseModelDao} = require('./baseModalDao');

class ReceiptDao extends baseModelDao {
    constructor() {
        super('receipts', 'receipt_id');
        this.baseModal = 'receipts';
        this.primaryKey = 'receipt_id';
    }

}

module.exports = ReceiptDao;
