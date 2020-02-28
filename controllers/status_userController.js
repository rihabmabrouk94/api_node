const StatusUsers = require('../dao/status_userDao');
var status_usersInst = new StatusUsers();

module.exports =
    {
        update: function (req, res, next) {
            status_usersInst.update(req, res, next);
        },
        get: function (req, res, next) {
            status_usersInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            status_usersInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            status_usersInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            status_usersInst.delete(req, res, next);
        }
    };
