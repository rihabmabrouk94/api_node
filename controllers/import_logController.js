const ImportLogs = require('../dao/import_logDao');
var import_logsInst = new ImportLogs();

module.exports =
    {
        update: function (req, res, next) {
            import_logsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            import_logsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            import_logsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            import_logsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            import_logsInst.delete(req, res, next);
        }
    };
