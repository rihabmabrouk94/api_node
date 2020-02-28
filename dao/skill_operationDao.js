const {baseModelDao} = require('./baseModalDao');

class SkilloperationsDao extends baseModelDao {
    constructor() {
        super('skill_operations', 'skill_operation_id');
        this.baseModal = 'skill_operations';
        this.primaryKey = 'skill_operation_id';
    }

    updateSkilloperations(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};
         console.log('params', params)
        this.db['skill_operations'].findAll({
            include: [{
                model: this.db['skills'],
                as: 'skill',
            }],
            where: {
                operation_template_id: params.operation_template_id
            }
        }).then(data => {
            var oldSkills = [];

            data.forEach(skill => {
                oldSkills.push(skill.skill.skill_id);
            });

            if (params && params.skills) {

                params.skills.forEach(newSkill => {

                    if(oldSkills.indexOf(newSkill) === -1) {

                        var modalObj = this.db[this.baseModal].build({
                            operation_template_id: params.operation_template_id,
                            skill_id: newSkill
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldSkills.forEach(oldSkills =>{
                    if(params.skills.indexOf(oldSkills)==-1){

                        this.db['skill_operations'].destroy(
                            {
                                where : {
                                    operation_template_id: params.operation_template_id,
                                    skill_id: oldSkills
                                }
                            }).then(res=>{})
                    }
                })
            }
            res.send(oldSkills)
        })
    }
    getskillbyIdOperation(req, res, next) {
        console.log('operation_template_id', req.params.operation_template_id)
        this.db['skill_operations'].findAll({
            // include: [{
            //     model: this.db['operation_templates'],
            //     as: 'operation_template',
            // }],
            where: {

                operation_template_id: req.params.operation_template_id
            }
        }).then(data => {
            res.send({
                success: true,
                data: data
            })
        })
    }
}

module.exports = SkilloperationsDao;
