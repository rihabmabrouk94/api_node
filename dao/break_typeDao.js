const {baseModelDao} = require('./baseModalDao');

class BreakTypeDao extends baseModelDao {
    constructor() {
        super('break_types', 'break_type_id');
        this.baseModal = 'break_types';
        this.primaryKey = 'break_type_id';
    }

    getBreakList(req, res, next)
    {
        this.db['break_types'].findAll(
            {
                include: [
                    { model: this.db['break_type_categories'] }]
            }
        ).then(data => {
            res.json({data:data});
        });

    }
}


module.exports = BreakTypeDao;
