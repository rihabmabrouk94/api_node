const {baseModelDao} = require('./baseModalDao');

class SkillDao extends baseModelDao {
    constructor() {
        super('skills', 'skill_id');
        this.baseModal = 'skills';
        this.primaryKey = 'skill_id';
    }

}

module.exports = SkillDao;
