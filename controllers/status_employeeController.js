const StatusEmployees = require('../dao/status_employeeDao');
var status_employeeInst = new StatusEmployees();
module.exports =
    {
        update: function (req, res, next) {
            status_employeeInst.update(req, res, next);
        },
        get: function (req, res, next) {
            status_employeeInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            status_employeeInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            status_employeeInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            status_employeeInst.delete(req, res, next);
        }
    };
