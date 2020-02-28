const {baseModelDao} = require('./baseModalDao');

class BreakTypeCategorieDao extends baseModelDao {
    constructor() {
        super('break_type_categories', 'category_id');
        this.baseModal = 'break_type_categories';
        this.primaryKey = 'category_id';
    }

}

module.exports = BreakTypeCategorieDao;
