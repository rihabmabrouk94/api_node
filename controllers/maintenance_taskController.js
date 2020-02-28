const MaintenanceTasks = require('../dao/maintenance_taskDao');
var maintenance_tasksInst = new MaintenanceTasks();

module.exports =
    {
        update: function (req, res, next) {
            maintenance_tasksInst.update(req, res, next);
        },
        get: function (req, res, next) {
            maintenance_tasksInst.find(req, res, next);
        },
        save: function (req, res, next) {
            maintenance_tasksInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            maintenance_tasksInst.delete(req, res, next);
        },
        startMaintenanceFeed : function (req, res, next) {
            maintenance_tasksInst.startMaintenanceFeed(req, res, next);
        },
        taskMaintenanceFinished:  function (req, res, next) {
            maintenance_tasksInst.taskMaintenanceFinished(req, res, next);
        },
        openedMaintenanceTask : function (req, res, next) {
            maintenance_tasksInst.openedMaintenanceTask(req, res, next);
        },
        insertMaintenanceTask: function (req, res, next) {
            maintenance_tasksInst.insertMaintenanceTask(req, res, next);
        },
        findMaintenanceFeedById: function (req, res, next) {
            maintenance_tasksInst.findMaintenanceFeedById(req, res, next);
        },
        openedmaintenanceTaskList: function(req,res , next){
            maintenance_tasksInst.openedmaintenanceTaskList(req, res, next);
        },
        addMaintenanceTask : function (req, res, next) {
            maintenance_tasksInst.addMaintenanceTask(req, res, next);
        },
        findById: function(req, res, next) {
            maintenance_tasksInst.findByEncodeId(req,res , next);
        },
        getMaintenanceFeedsByTaskMaintenance_id: function(req, res, next) {
            maintenance_tasksInst.getMaintenanceFeedsByTaskMaintenance_id(req, res, next);
        },
        getmechanical_unplanned_maintenance_tasks :function(req, res, next) {
            maintenance_tasksInst.getmechanical_unplanned_maintenance_tasks(req, res, next);
        },
        total_mechanical_unplanned_maintenance_task:function(req, res, next) {
            maintenance_tasksInst.total_mechanical_unplanned_maintenance_task(req, res, next);
        },
        getElectronics_unplanned_maintenance_tasks:function(req, res, next) {
            maintenance_tasksInst.getElectronics_unplanned_maintenance_tasks(req, res, next);
        },
        total_electronic_unplanned_maintenance_task:function(req, res, next) {
            maintenance_tasksInst.total_electronic_unplanned_maintenance_task(req, res, next);
        },
        views_stats_break_down_per_maintenance_template:function (req, res,next) {
            maintenance_tasksInst.views_stats_break_down_per_maintenance_template(req, res, next);

        },
        views_stats_break_down_per_machine_type:function (req, res,next) {
            maintenance_tasksInst.views_stats_break_down_per_machine_type(req, res, next);

        },
        view_mtsk_unplanned: function(req, res, next){
            maintenance_tasksInst.view_mtsk_unplanned(req, res, next);
        },
        mtsk_onhold_under_repair: function(req, res, next){
            maintenance_tasksInst.mtsk_onhold_under_repair(req, res, next);
        },
        mtsk_planned_unplanned_by_source: function(req, res, next){
            maintenance_tasksInst.mtsk_planned_unplanned_by_source(req, res, next);
        },
        total_break_down_run_time: function(req, res, next){
            maintenance_tasksInst.total_break_down_run_time(req, res, next);
        },
        uplanned_brakedown_records: function(req, res, next){
            maintenance_tasksInst.uplanned_brakedown_records(req, res, next);
        },
        views_mechanical_availability: function(req, res, next){
            maintenance_tasksInst.views_mechanical_availability(req, res, next);
        },
        getByMachineID: function (req, res, next) {
            maintenance_tasksInst.getByMachineID(req, res, next);
        },
        mtsk_planned_by_source : function (req, res, next) {
            maintenance_tasksInst.mtsk_planned_by_source(req, res, next);
        }
    };
