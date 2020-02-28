const {baseModelDao} = require('./baseModalDao');

class TerminalTypeDao extends baseModelDao {
    constructor() {
        super('terminal_types', 'Tt_id');
        this.baseModal = 'terminal_types';
        this.primaryKey = 'Tt_id';
    }

}

module.exports = TerminalTypeDao;