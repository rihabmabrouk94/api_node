const Notifications = require('../dao/notificationDao');
var notificationsInst = new Notifications();

module.exports =
    {
        update: function (req, res, next) {
            notificationsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            notificationsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            notificationsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            notificationsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            notificationsInst.delete(req, res, next);
        },
        getForSession: function (req, res, next) {
            notificationsInst.getForSession(req, res, next);
        },
        readMessageByUser: function (req, res, next) {
            notificationsInst.readMessageByUser(req, res, next);
        },
        findAllNotifications:function (req, res, next) {
            notificationsInst.findAllNotifications(req, res, next);
        },
    };
