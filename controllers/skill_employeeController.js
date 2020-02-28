const SkillEmployees = require('../dao/skill_employeeDao');
var skill_employeesInst = new SkillEmployees();


module.exports =
    {
        update: function (req, res, next) {
            skill_employeesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            skill_employeesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            skill_employeesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            skill_employeesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            skill_employeesInst.delete(req, res, next);
        },
        updateSkillEmployee  : function(req,res,next) {
            skill_employeesInst.updateSkillEmployee(req,res,next);
        },
        getskillbyIdEmp  : function(req,res,next) {
            skill_employeesInst.getskillbyIdEmp(req,res,next);
        }

    };
