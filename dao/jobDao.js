const {baseModelDao} = require('./baseModalDao');

class JobDao extends baseModelDao {
    constructor() {
        super('jobs', 'job_id');
        this.baseModal = 'jobs';
        this.primaryKey = 'job_id';
    }

}

module.exports = JobDao;