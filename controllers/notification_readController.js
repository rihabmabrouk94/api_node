const NotificationReads = require('../dao/notification_readDao');
var notification_readsInst = new NotificationReads();

module.exports =
    {
        update: function (req, res, next) {
            notification_readsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            notification_readsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            notification_readsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            notification_readsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            notification_readsInst.delete(req, res, next);
        },
        readAllMessage: function (req, res, next) {
            notification_readsInst.readAllMessage(req, res, next);
        },
    };
