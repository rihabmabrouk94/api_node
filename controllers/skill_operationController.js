const SkillOperation = require('../dao/skill_operationDao');
var skill_operationsInst = new SkillOperation();


module.exports =
    {
        update: function (req, res, next) {
            skill_operationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            skill_operationsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            skill_operationsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            skill_operationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            skill_operationsInst.delete(req, res, next);
        },
        updateSkilloperations  : function(req,res,next) {
            skill_operationsInst.updateSkilloperations(req,res,next);
        },
        getskillbyIdOperation  : function(req,res,next) {
            skill_operationsInst.getskillbyIdOperation(req,res,next);
        }

    };
