const {baseModelDao} = require('./baseModalDao');

class TerminalDao extends baseModelDao {
    constructor() {
        super('terminals', 'Terminal_id');
        this.baseModal = 'terminals';
        this.primaryKey = 'Terminal_id';
    }

}

module.exports = TerminalDao;