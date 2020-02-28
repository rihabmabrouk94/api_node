const {baseModelDao} = require('./baseModalDao');

class SkillEmployeesDao extends baseModelDao {
    constructor() {
        super('skill_employees', 'skill_employee_id');
        this.baseModal = 'skill_employees';
        this.primaryKey = 'skill_employee_id';
    }

    updateSkillEmployee(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['skill_employees'].findAll({
            include: [{
                model: this.db['skills'],
                as: 'skill',
            }],
            where: {

                emp_id: params.emp_id
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
                            emp_id: params.emp_id,
                            skill_id: newSkill
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldSkills.forEach(oldSkills =>{
                    if(params.skills.indexOf(oldSkills)==-1){

                        this.db['skill_employees'].destroy(
                            {
                                where : {
                                    emp_id: params.emp_id,
                                    skill_id: oldSkills
                                }
                            }).then(res=>{})
                    }
                })
            }
            res.send(oldSkills)
        })
    }
    getskillbyIdEmp(req, res, next) {
        console.log('emp_id', req.params.emp_id)
        this.db['skill_employees'].findAll({
            // include: [{
            //     model: this.db['operation_templates'],
            //     as: 'operation_template',
            // }],
            where: {

                emp_id: req.params.emp_id
            }
        }).then(data => {
            res.send({
                success: true,
                data: data
            })
        })
    }
}

module.exports = SkillEmployeesDao;
