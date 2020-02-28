const Skills = require('../dao/skillDao');
var skillsInst = new Skills();

module.exports = {
    update: function (req, res, next) {
        skillsInst.update(req, res, next);
    },
    get: function (req, res, next) {
        skillsInst.find(req, res, next);
    },
    getById: function (req, res, next) {
        skillsInst.findById(req, res, next);
    },
    save: function (req, res, next) {
        skillsInst.save(req, res, next);
    },
    delete: function (req, res, next) {
        skillsInst.delete(req, res, next);
    }
};
