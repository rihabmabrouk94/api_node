const cartPendingSessionsDao = require('../dao/cartPendingSessionsDao');
var cartPendingSessionsDaoInst = new cartPendingSessionsDao();

module.exports =
    {
        update: function (req, res, next) {
            cartPendingSessionsDaoInst.update(req, res, next);
        },
        get: function (req, res, next) {
            cartPendingSessionsDaoInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            cartPendingSessionsDaoInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            cartPendingSessionsDaoInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            cartPendingSessionsDaoInst.delete(req, res, next);
        },
        cartPendingSessionsByOrder: function (req, res, next) {
            cartPendingSessionsDaoInst.cartPendingSessionsByOrder(req, res, next);
        },
        total_qauntity_by_operator: function (req, res, next) {
            cartPendingSessionsDaoInst.total_qauntity_by_operator(req, res , next);
        },
        getCpsByDateAndOperator : function(req, res, next) {
            cartPendingSessionsDaoInst.getCpsByDateAndOperator(req, res, next)
        },
        usersessionStatByDay2: function(req, res, next) {
            cartPendingSessionsDaoInst.usersessionStatByDay2(req, res, next)
        },
        getCpsOperation: function (req , res, next) {
            cartPendingSessionsDaoInst.getCpsOperation(req, res , next)
        },
        release_operation: function(req, res, next) {
            cartPendingSessionsDaoInst.release_operation(req, res , next)
        },
        produce_quantity_by_line_hours: function(req, res, next) {
            cartPendingSessionsDaoInst.produce_quantity_by_line_hours(req, res, next)
        },
        produce_quantity_by_line_days: function(req, res, next) {
            cartPendingSessionsDaoInst.produce_quantity_by_line_days(req, res, next)
        }

    };
