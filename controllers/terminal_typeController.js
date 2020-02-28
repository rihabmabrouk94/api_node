const TerminalTypes = require('../dao/terminal_typeDao');
var terminal_typesInst = new TerminalTypes();

module.exports =
    {
        update: function (req, res, next) {
            terminal_typesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            terminal_typesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            terminal_typesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            terminal_typesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            terminal_typesInst.delete(req, res, next);
        }
    };
