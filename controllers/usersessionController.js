const Usersessions = require('../dao/usersessionDao');
var usersessionsInst = new Usersessions();

module.exports =
    {
        update: function (req, res, next) {
            usersessionsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            usersessionsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            usersessionsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            usersessionsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            usersessionsInst.delete(req, res, next);
        },
        infoProductivityDayAction: function (req, res, next) {
            usersessionsInst.infoProductivityDayAction(req, res, next);
        },
        productivityDay: function (req,res,next) {
            usersessionsInst.productivityDay(req, res,next);

        },
        view_operators_session: function(req, res, next) {
            usersessionsInst.view_operators_session(req, res, next);
        },
        operators_sessions_info: function (req, res,next) {
            usersessionsInst.operators_sessions_info(req,res,next);
        },
        employee_state_by_day_by_line: function (req, res,next) {
            usersessionsInst.employee_state_by_day_by_line(req,res,next);
        },
        produce_quantity: function(req, res, next ) {
            usersessionsInst.produce_quantity(req, res, next);
        },
        global_productivity: function (req, res, next ){
            usersessionsInst.global_productivity(req, res, next);
        },
        getDate: function (req, res, next) {
            usersessionsInst.getDate(req, res, next);
        },
        Production_quantity_Bydate(req, res, next ){
            usersessionsInst.Production_quantity_Bydate(req, res, next);

        },
        produce_quantity_by_week(req, res, next ){
            usersessionsInst.produce_quantity_by_week(req, res, next);

        },
        global_productivity_by_week(req, res, next ){
            usersessionsInst.global_productivity_by_week(req, res, next);

        },
        productivity_operator(req, res, next ){
            usersessionsInst.productivity_operator(req, res, next);
        },
        produce_quantity_reparation(req, res, next) {
            usersessionsInst.produce_quantity_reparation(req, res, next);
        },
        produce_quantity_stat(req, res, next) {
            usersessionsInst.produce_quantity_stat(req, res, next);
        },
        global_productivity_by_line(req, res, next){
            usersessionsInst.global_productivity_by_line(req, res, next);
        },
        global_productivity_all_line(req, res, next){
            usersessionsInst.global_productivity_all_line(req, res, next);
        },
        global_productivity_by_day_per_week(req, res, next) {
            usersessionsInst.global_productivity_by_day_per_week(req, res, next);
        },
        produce_quantity_stat_by_line(req, res , next ) {
            usersessionsInst.produce_quantity_stat_by_line(req, res , next )
        },
        produce_quantity_stat_by_day (req , res, next) {
            usersessionsInst.produce_quantity_stat_by_day(req, res, next)
        },
        produce_quantity_stat_by_line_by_day( req ,res, next) {
            usersessionsInst.produce_quantity_stat_by_line_by_day(req, res, next)
        },
        global_productivity_employee_by_day(req ,res ,next) {
            usersessionsInst.global_productivity_employee_by_day(req,res, next);
        },
        global_productivity_employee_by_week(req ,res ,next) {
            usersessionsInst.global_productivity_employee_by_week(req,res, next);
        },
        global_productivity_by_hour(req ,res ,next) {
            usersessionsInst.global_productivity_by_hour(req,res, next);
        },
        global_productivity_by_hour_line(req ,res ,next) {
            usersessionsInst.global_productivity_by_hour_line(req,res, next);
        },
        global_productivity_by_week_by_day(req ,res ,next) {
            usersessionsInst.global_productivity_by_week_by_day(req,res, next);
        },
        global_productivity_by_week_by_day_line(req ,res ,next) {
            usersessionsInst.global_productivity_by_week_by_day_line(req,res, next);
        }
    };
