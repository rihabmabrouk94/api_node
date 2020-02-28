const MaintenanceFeeds = require('../dao/maintenance_feedDao');
var maintenance_feedsInst = new MaintenanceFeeds();

module.exports =
    {
        update: function (req, res, next) {
            maintenance_feedsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            maintenance_feedsInst.find(req, res, next);
        },
        save: function (req, res, next) {
            maintenance_feedsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            maintenance_feedsInst.delete(req, res, next);
        },
        insert_maintenance_feed: function (req, res, next) {
            maintenance_feedsInst.insert_maintenance_feed(req, res, next);
        }
    };
