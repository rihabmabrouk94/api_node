'use strict';
const path = require('path');
var multer = require('multer');
global.__basedir = __dirname;
var appDir = path.dirname(require.main.filename);
var timeout = require('connect-timeout')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './resources/efiles/public/upload/')
        cb(null, appDir + '/resources/efiles/public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
});
var max_upload_size = 50 * 1024 * 1024;
var upload = multer({
    storage: storage,
    limits:{
        fileSize: max_upload_size
    }
});



var router = require('express').Router(),
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    ClientController = require('../controllers/clientController'),
    SiteController = require('../controllers/siteController'),
    ProfileController = require('../controllers/profileController'),
    GroupController = require('../controllers/groupController'),
    EmployeeController = require('../controllers/employeeController'),
    StatusEmployeeController = require('../controllers/status_employeeController'),
    JobController = require('../controllers/jobController'),
    CountryController = require('../controllers/countryController'),
    LineController = require('../controllers/lineController'),
    MachineController = require('../controllers/machineController'),
    StatusMachineController = require('../controllers/status_machineController'),
    GatewayTypeController = require('../controllers/gateway_typeController'),
    GatewayController = require('../controllers/gatewayController'),
    BoxTypeController = require('../controllers/box_typeController'),
    BoxController = require('../controllers/boxController'),
    ServerController = require('../controllers/serverController'),
    ErpSectionController = require('../controllers/erp_sectionController'),
    TerminalTypeController = require('../controllers/terminal_typeController'),
    TerminalController = require('../controllers/terminalController'),
    StatusUserController = require('../controllers/status_userController'),
    EfileController = require('../controllers/efileController'),
    PermissionController = require('../controllers/permissionsController'),
    HasPermissionsController = require('../controllers/has_permissionsController'),
    PrinterController = require('../controllers/printerController'),
    ArticleController = require('../controllers/articleController'),
    BreakController = require('../controllers/breakController'),
    CartController = require('../controllers/cartController'),
    BreakTypeController = require('../controllers/break_typeController'),
    OrderController = require('../controllers/orderController'),
    ImportLogController = require('../controllers/import_logController'),
    OperationController = require('../controllers/operationController'),
    GpdworkController = require('../controllers/gpdworkController'),
    BundleCartsController = require('../controllers/bundleCartsController'),
    CartPendingOperationController = require('../controllers/cartPendingOperationController'),
    CartPendingSerssionController = require('../controllers/cartPendingSessionController'),
    CartReopenedOperationController = require('../controllers/cartReopenedOperationController'),
    OperationGroupsController = require('../controllers/operationGroupsController'),
    OperationProductivityController = require('../controllers/operatorProductivityController'),
    BundleController = require('../controllers/bundleController'),
    UsersessionController = require('../controllers/usersessionController'),
    WorkfileController = require('../controllers/workfileController'),
    ReportController = require('../controllers/reportController'),
    TokenApiListenerController = require('../controllers/token_api_listenerController'),
    RomboldtxtController = require('../controllers/romboldtxtController'),
    StatHourController = require('../controllers/stat_hourController'),
    StatDayController = require('../controllers/stat_dayController'),
    StatInstController = require('../controllers/stat_instController'),
    StatMonthController = require('../controllers/stat_monthController'),
    StatWeekController = require('../controllers/stat_weekController'),
    StatYearController = require('../controllers/stat_yearController'),
    MachineGroupController = require('../controllers/machine_groupController'),
    SkillController = require('../controllers/skillController'),
    SkillEmployeeController = require('../controllers/skill_employeeController'),
    MachineTypeController =require('../controllers/machineTypeController') ,
    ClientController = require('../controllers/clientController'),
    BreakTypeCategorieController = require('../controllers/break_type_categorieController'),
    OperationTemplateController = require('../controllers/operation_templateController'),
    ArticleOperationTemplateController = require('../controllers/article_operation_templateController'),
    TicketStructureController = require('../controllers/ticket_structureController'),
    StatusTicketController = require('../controllers/status_ticketController'),
    TicketFeedController = require('../controllers/ticket_feedController'),
    TicketFeedAttachmentController = require('../controllers/ticket_feed_attachmentController'),
    SequenceController = require('../controllers/sequenceController'),
    StatusMachineLightController = require('../controllers/status_machine_lightsController'),
    MachineLightStatusSessionController = require('../controllers/machineLightStatusSessionController'),
    ObservationController = require('../controllers/observationController'),
    NotificationController = require('../controllers/notificationController'),
    NotificationReadController = require('../controllers/notification_readController'),
    OperationSequenceController = require('../controllers/sequence_operationController'),
    StatusMaintenanceController = require('../controllers/status_maintenanceController'),
    MaintenanceFeedController = require('../controllers/maintenance_feedController'),
    MaintenanceTaskController = require('../controllers/maintenance_taskController'),
    MachineEventsController = require('../controllers/machines_eventsController'),
    PriorityController = require('../controllers/priorityController'),
    MaintenanceTemplateController = require('../controllers/maintenance_templateController'),
    MtBoxBuildsController = require('../controllers/mtbox_buildsContorller'),
    DirectProductionModeController = require('../controllers/direct_production_modeController'),
    OperationDirectProductionModeController = require('../controllers/operation_direct_production_modeController'),
    StockProductionProductController = require('../controllers/stock_production_productController'),
    ReceiptController = require('../controllers/receiptController'),
    DepositController = require('../controllers/DepositsController'),
    ProductionProductController= require('../controllers/production_productsController'),
    ProductionProductProviderController = require('../controllers/production_product_providerController'),
    DeviseController = require('../controllers/deviseController'),
    CategoryProductController = require('../controllers/category_productController'),
    TakingController = require('../controllers/takingController'),
    ArticleProductionProductController = require('../controllers/articleProductionProductController'),
    MachineEventTypeController = require('../controllers/MachineEventTypeController'),
    MachineParamsController = require('../controllers/machine_paramsController'),
    MachineParamsTypeController = require('../controllers/machine_params_typeController'),
    EventsController = require('../controllers/eventController'),
    MachineOperationTemplateController = require('../controllers/machineOperationTemplateController'),
    Skill_operationController = require('../controllers/skill_operationController'),
     MtemplateMtypeController = require('../controllers/maintenaceTemp_MachineTypeController'),
    LineArticleController = require('../controllers/line_articleController');



var APIRoutes = function (passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser),
    router.post('/user', UserController.add);
    router.put('/forgotPassword', UserController.forgot_password);
    router.post('/sendEmailWithoutPassport', UserController.send_email_without_passport);
    router.get('/findUserByResetPasswordToken/:user_id/:token', UserController.find_user_by_reset_password_token);
    router.put('/randomResetPasswordToken', UserController.random_reset_password_token);
    router.post('/sendEmailForgotPassword', UserController.send_email_forgot_password);
    router.put('/initResetPasswordToken', UserController.init_reset_password_token);
    router.get('/finduserById/:user_id', UserController.findUserById);
    router.put('/updateUserWithoutPassport', UserController.update);
    router.get('/findUserByActiveAccountToken/:user_id/:token', UserController.find_user_by_active_account_token);
    router.put('/updateEtat', UserController.update_etat);

    router.put('/user/update', passport.authenticate('jwt', {session: false}), UserController.update);
    router.post('/user/save', UserController.add);
    router.delete('/user/delete/:params', passport.authenticate('jwt', {session: false}), UserController.delete);
    router.get('/user/getId/:params', passport.authenticate('jwt', {session: false}), UserController.find_by_id);
    router.get('/user/get/:params?', passport.authenticate('jwt', {session: false}), UserController.get);
    router.post('/userEmail', passport.authenticate('jwt', {session: false}), UserController.send_email);
    router.post('/sendEmailActiveAccount', UserController.send_email_active_account);
    router.get('/user/getUserById/:user_id', UserController.findUserById)

    // router.post('/findBySearchQueryPage/:page/:limit', passport.authenticate('jwt', { session: false }), UserController.find_by_searchQuery);
    // router.post('/findUsersByClientPage/:page/:limit', passport.authenticate('jwt', { session: false }), UserController.find_by_client);
    // router.get('/userPage/:page/:limit', passport.authenticate('jwt', { session: false }), UserController.find_all_page);
    // router.post('/findProfile', passport.authenticate('jwt', { session: false }), UserController.find_user_by_profile);

    router.put('/client/update', passport.authenticate('jwt', {session: false}), ClientController.update);
    router.get('/client/get/:params?', passport.authenticate('jwt', {session: false}), ClientController.get);
    router.get('/client/findtest', passport.authenticate('jwt', {session: false}), ClientController.findtest);
    router.post('/client/save', ClientController.save);
    router.delete('/client/delete/:params', passport.authenticate('jwt', {session: false}), ClientController.delete);
    router.get('/client/getId/:params', passport.authenticate('jwt', {session: false}), ClientController.getById);

    router.post('/site/save', passport.authenticate('jwt', {session: false}), SiteController.save);
    router.get('/site/get/:params?', passport.authenticate('jwt', {session: false}), SiteController.get);
    router.put('/site/update', passport.authenticate('jwt', {session: false}), SiteController.update);
    router.delete('/site/delete/:params', passport.authenticate('jwt', {session: false}), SiteController.delete);
    router.get('/site/getId/:params', passport.authenticate('jwt', {session: false}), SiteController.getById);
    router.get('/sitesByClient/:client_id', passport.authenticate('jwt', {session: false}), SiteController.sitesByClients);

    router.post('/profile/save', passport.authenticate('jwt', {session: false}), ProfileController.save);
    router.get('/profile/get/:params?', passport.authenticate('jwt', {session: false}), ProfileController.get);
    router.put('/profile/update', passport.authenticate('jwt', {session: false}), ProfileController.update);
    router.delete('/profile/delete/:params', passport.authenticate('jwt', {session: false}), ProfileController.delete);
    router.get('/profile/getId/:params', passport.authenticate('jwt', {session: false}), ProfileController.getById);
    router.get('/profile/getProfiles/:params?', passport.authenticate('jwt', {session: false}), ProfileController.getProfiles);

    router.get('/groupsBySite/:site_id', passport.authenticate('jwt', {session: false}), GroupController.groups_By_Site);
    router.post('/group/save', passport.authenticate('jwt', {session: false}), GroupController.save);
    router.get('/group/get/:params?', passport.authenticate('jwt', {session: false}), GroupController.get);
    router.put('/group/update', passport.authenticate('jwt', {session: false}), GroupController.update);
    router.delete('/group/delete/:params', passport.authenticate('jwt', {session: false}), GroupController.delete);
    router.get('/group/getId/:params', passport.authenticate('jwt', {session: false}), GroupController.getById);

    router.put('/uploadFileEmployee/:emp_id', passport.authenticate('jwt', {session: false}), upload.single('files'), EmployeeController.uploadFile);
    router.post('/employee/save', passport.authenticate('jwt', {session: false}), EmployeeController.save);
    router.get('/employee/get/:params?', passport.authenticate('jwt', {session: false}), EmployeeController.get);
    router.put('/employee/update', passport.authenticate('jwt', {session: false}), EmployeeController.update);
    router.delete('/employee/delete/:params', passport.authenticate('jwt', {session: false}), EmployeeController.delete);
    router.get('/employee/getId/:params', passport.authenticate('jwt', {session: false}), EmployeeController.getById);
    router.get('/findMat',EmployeeController.find_matricule);
    router.post('/employee/save_employee',EmployeeController.Add_user_mat);
    router.put('/employee/update_employee',EmployeeController.update_user_mat);    

    router.post('/status_employee/save', passport.authenticate('jwt', {session: false}), StatusEmployeeController.save);
    router.get('/status_employee/get/:params?', passport.authenticate('jwt', {session: false}), StatusEmployeeController.get);
    router.put('/status_employee/update', passport.authenticate('jwt', {session: false}), StatusEmployeeController.update);
    router.delete('/status_employee/delete/:params', passport.authenticate('jwt', {session: false}), StatusEmployeeController.delete);
    router.get('/status_employee/getId/:params', passport.authenticate('jwt', {session: false}), StatusEmployeeController.getById);

    router.post('/job/save', passport.authenticate('jwt', {session: false}), JobController.save);
    router.get('/job/get/:params?', JobController.get);
    router.put('/job/update', passport.authenticate('jwt', {session: false}), JobController.update);
    router.delete('/job/delete/:params', passport.authenticate('jwt', {session: false}), JobController.delete);
    router.get('/job/getId/:params', passport.authenticate('jwt', {session: false}), JobController.getById);
    router.get('/countries/get/:params?', CountryController.get);

    router.post('/line/save', passport.authenticate('jwt', {session: false}), LineController.save);
    router.get('/line/get/:params?', LineController.get);
    router.put('/line/update', passport.authenticate('jwt', {session: false}), LineController.update);
    router.delete('/line/delete/:params', passport.authenticate('jwt', {session: false}), LineController.delete);
    router.get('/line/getId/:params', passport.authenticate('jwt', {session: false}), LineController.getById);
    router.get('/line/getBoxByLine/:line_id',passport.authenticate('jwt', {session: false}),LineController.getBoxByLine);
    router.get('/line/getArticleByLine/:line_id',passport.authenticate('jwt', {session: false}),LineController.getArticleByLine);


    router.post('/machine/save', passport.authenticate('jwt', {session: false}), MachineController.save);
    router.get('/machine/get/:params?', passport.authenticate('jwt', {session: false}), MachineController.get);
    router.put('/machine/update', passport.authenticate('jwt', {session: false}), MachineController.update);
    router.delete('/machine/delete/:params', passport.authenticate('jwt', {session: false}), MachineController.delete);
    router.get('/machine/getId/:params', passport.authenticate('jwt', {session: false}), MachineController.getById);
    router.get('/machine/infoMachine', MachineController.infoMachineAction);
    router.get('/machine/getMachineFailure', MachineController.getMachineFailure);

    router.post('/status_machine/save', passport.authenticate('jwt', {session: false}), StatusMachineController.save);
    router.get('/status_machine/get/:params?', passport.authenticate('jwt', {session: false}), StatusMachineController.get);
    router.put('/status_machine/update', passport.authenticate('jwt', {session: false}), StatusMachineController.update);
    router.delete('/status_machine/delete/:params', passport.authenticate('jwt', {session: false}), StatusMachineController.delete);
    router.get('/status_machine/getId/:params', passport.authenticate('jwt', {session: false}), StatusMachineController.getById);

    router.post('/gateway_type/save', passport.authenticate('jwt', {session: false}), GatewayTypeController.save);
    router.get('/gateway_type/get/:params?', passport.authenticate('jwt', {session: false}), GatewayTypeController.get);
    router.put('/gateway_type/update', passport.authenticate('jwt', {session: false}), GatewayTypeController.update);
    router.delete('/gateway_type/delete/:params', passport.authenticate('jwt', {session: false}), GatewayTypeController.delete);
    router.get('/gateway_type/getId/:params', passport.authenticate('jwt', {session: false}), GatewayTypeController.getById);

    router.post('/gateway/save', passport.authenticate('jwt', {session: false}), GatewayController.save);
    router.get('/gateway/get/:params?', passport.authenticate('jwt', {session: false}), GatewayController.get);
    router.put('/gateway/update', passport.authenticate('jwt', {session: false}), GatewayController.update);
    router.delete('/gateway/delete/:params', passport.authenticate('jwt', {session: false}), GatewayController.delete);
    router.get('/gateway/getId/:params', passport.authenticate('jwt', {session: false}), GatewayController.getById);

    router.post('/box_type/save', passport.authenticate('jwt', {session: false}), BoxTypeController.save);
    router.get('/box_type/get/:params?', passport.authenticate('jwt', {session: false}), BoxTypeController.get);
    router.put('/box_type/update', passport.authenticate('jwt', {session: false}), BoxTypeController.update);
    router.delete('/box_type/delete/:params', passport.authenticate('jwt', {session: false}), BoxTypeController.delete);
    router.get('/box_type/getId/:params', passport.authenticate('jwt', {session: false}), BoxTypeController.getById);

    router.post('/box/save', passport.authenticate('jwt', {session: false}), BoxController.save);
    router.get('/box/get/:params?', passport.authenticate('jwt', {session: false}), BoxController.get);
    router.put('/box/update', passport.authenticate('jwt', {session: false}), BoxController.update);
    router.delete('/box/delete/:params', passport.authenticate('jwt', {session: false}), BoxController.delete);
    router.get('/box/getId/:params', passport.authenticate('jwt', {session: false}), BoxController.getById);
    router.get('/affectMachineToBox', BoxController.MachineAffectAction);
    router.post('/box/bulkUpdate', BoxController.BulkUpdate);

    router.post('/server/save', passport.authenticate('jwt', {session: false}), ServerController.save);
    router.get('/server/get/:params?', passport.authenticate('jwt', {session: false}), ServerController.get);
    router.put('/server/update', passport.authenticate('jwt', {session: false}), ServerController.update);
    router.delete('/server/delete/:params', passport.authenticate('jwt', {session: false}), ServerController.delete);
    router.get('/server/getId/:params', passport.authenticate('jwt', {session: false}), ServerController.getById);

    router.post('/erp_section/save', passport.authenticate('jwt', {session: false}), ErpSectionController.save);
    router.get('/erp_section/get/:params?', passport.authenticate('jwt', {session: false}), ErpSectionController.get);
    router.put('/erp_section/update', passport.authenticate('jwt', {session: false}), ErpSectionController.update);
    router.delete('/erp_section/delete/:params', passport.authenticate('jwt', {session: false}), ErpSectionController.delete);
    router.get('/erp_section/getId/:params', passport.authenticate('jwt', {session: false}), ErpSectionController.getById);

    router.post('/terminal_type/save', passport.authenticate('jwt', {session: false}), TerminalTypeController.save);
    router.get('/terminal_type/get/:params?', passport.authenticate('jwt', {session: false}), TerminalTypeController.get);
    router.put('/terminal_type/update', passport.authenticate('jwt', {session: false}), TerminalTypeController.update);
    router.delete('/terminal_type/delete/:params', passport.authenticate('jwt', {session: false}), TerminalTypeController.delete);
    router.get('/terminal_type/getId/:params', passport.authenticate('jwt', {session: false}), TerminalTypeController.getById);

    router.post('/terminal/save', passport.authenticate('jwt', {session: false}), TerminalController.save);
    router.get('/terminal/get/:params?', passport.authenticate('jwt', {session: false}), TerminalController.get);
    router.put('/terminal/update', passport.authenticate('jwt', {session: false}), TerminalController.update);
    router.delete('/terminal/delete/:params', passport.authenticate('jwt', {session: false}), TerminalController.delete);
    router.get('/terminal/getId/:params', passport.authenticate('jwt', {session: false}), TerminalController.getById);

    router.post('/status_user/save', passport.authenticate('jwt', {session: false}), StatusUserController.save);
    router.get('/status_user/get/:params?', passport.authenticate('jwt', {session: false}), StatusUserController.get);
    router.put('/status_user/update', passport.authenticate('jwt', {session: false}), StatusUserController.update);
    router.delete('/status_user/delete/:params', passport.authenticate('jwt', {session: false}), StatusUserController.delete);
    router.get('/status_user/getId/:params', passport.authenticate('jwt', {session: false}), StatusUserController.getById);

    router.post('/uploadFile', passport.authenticate('jwt', {session: false}), upload.single('file'), EfileController.upload);
    router.get('/file/thumb/full/:file_id(\\d+)/', EfileController.getImageByStyle);
    router.get('/file/thumb/full/:file_id(\\d+)/', EfileController.getVideoByStyle);


    router.put('/permission/update', passport.authenticate('jwt', {session: false}), PermissionController.update);
    router.get('/permission/get/:params?', passport.authenticate('jwt', {session: false}), PermissionController.get);
    router.post('/permission/save', passport.authenticate('jwt', {session: false}), PermissionController.save);
    router.delete('/permission/delete/:params', passport.authenticate('jwt', {session: false}), PermissionController.delete);
    router.get('/permission/getId/:params', passport.authenticate('jwt', {session: false}), PermissionController.getById);

    router.put('/has_permission/update', passport.authenticate('jwt', { session: false }), HasPermissionsController.update);
    router.get('/has_permission/get/:params?', passport.authenticate('jwt', { session: false }), HasPermissionsController.get);
    router.post('/has_permission/save', passport.authenticate('jwt', { session: false }), HasPermissionsController.save);
    router.delete('/has_permission/delete/:params', passport.authenticate('jwt', { session: false }), HasPermissionsController.delete);
    router.get('/has_permission/getId/:params', passport.authenticate('jwt', { session: false }), HasPermissionsController.getById);
    router.get('/has_permission/updatePermissions/:params', passport.authenticate('jwt', { session: false }), HasPermissionsController.updateHasPermission);

    router.put('/printer/update', passport.authenticate('jwt', {session: false}), PrinterController.update);
    router.get('/printer/get/:params?', passport.authenticate('jwt', {session: false}), PrinterController.get);
    router.post('/printer/save', passport.authenticate('jwt', {session: false}), PrinterController.save);
    router.delete('/printer/delete/:params', passport.authenticate('jwt', {session: false}), PrinterController.delete);
    router.get('/printer/getId/:params', passport.authenticate('jwt', {session: false}), PrinterController.getById);
    router.get('/printer/readFilePrinter/:bundle_id', PrinterController.readFilePrinter);
    router.get('/callback/bundle/:bundle_id', PrinterController.printCallbackAction);
    router.get('/printer/statusPrint/:bundle_id', PrinterController.statusPrint);
    // router.post('/:printer_ip'+':'+':port/print', PrinterController.exucutePrint);
    router.get('/printer/printBundle/:bundle_id', PrinterController.printBundle);

    router.get('/machineWithoutAuthenticate/get/:params?', MachineController.get);
    router.get('/machineWithoutAuthenticate/getId/:params', MachineController.getById);

    router.get('/boxWithoutAuthenticate/get/:params?', BoxController.get);
    router.get('/boxWithoutAuthenticate/getId/:params', BoxController.getById);

    router.put('/article/update', passport.authenticate('jwt', {session: false}), ArticleController.update);
    router.get('/article/get/:params?', passport.authenticate('jwt', {session: false}), ArticleController.get);
    router.post('/article/save', passport.authenticate('jwt', {session: false}), ArticleController.save);
    router.delete('/article/delete/:params', passport.authenticate('jwt', {session: false}), ArticleController.delete);
    router.get('/article/getId/:params', passport.authenticate('jwt', {session: false}), ArticleController.getById);

    router.put('/break/update', passport.authenticate('jwt', {session: false}), BreakController.update);
    router.get('/break/get/:params?', passport.authenticate('jwt', {session: false}), BreakController.get);
    router.post('/break/save', passport.authenticate('jwt', {session: false}), BreakController.save);
    router.delete('/break/delete/:params', passport.authenticate('jwt', {session: false}), BreakController.delete);
    router.get('/break/getId/:params', passport.authenticate('jwt', {session: false}), BreakController.getById);
    router.get('/break/start', BreakController.getBreakListAction);
    router.get('/break/finish', BreakController.finishBreakAction);
    router.get('/break/getList/:params', BreakController.getBreaks);
    router.get('/views_employee_breaks_by_day', BreakController.views_employee_breaks_by_day);

    router.put('/cart/update', passport.authenticate('jwt', {session: false}), CartController.update);
    router.get('/cart/get/:params?', passport.authenticate('jwt', {session: false}), CartController.get);
    router.post('/cart/save', passport.authenticate('jwt', {session: false}), CartController.save);
    router.delete('/cart/delete/:params', passport.authenticate('jwt', {session: false}), CartController.delete);
    router.get('/cart/getId/:params', passport.authenticate('jwt', {session: false}), CartController.getById);
    router.get('/cart/allRFIDCards',  CartController.allRFIDCards);

    router.put('/break_type/update', passport.authenticate('jwt', {session: false}), BreakTypeController.update);
    router.get('/break_type/get/:params?', passport.authenticate('jwt', {session: false}), BreakTypeController.get);
    router.post('/break_type/save', passport.authenticate('jwt', {session: false}), BreakTypeController.save);
    router.delete('/break_type/delete/:params', passport.authenticate('jwt', {session: false}), BreakTypeController.delete);
    router.get('/break_type/getId/:params', passport.authenticate('jwt', {session: false}), BreakTypeController.getById);
    router.get('/break_type/getList/:params?', BreakTypeController.getBreakList);

    router.put('/order/update', passport.authenticate('jwt', {session: false}), OrderController.update);
    router.get('/order/get/:params?', OrderController.get);
    router.post('/order/save', passport.authenticate('jwt', {session: false}), OrderController.save);
    router.delete('/order/delete/:params', passport.authenticate('jwt', {session: false}), OrderController.delete);
    router.get('/order/getId/:params', OrderController.getById);
    router.delete('/order/deleteBundleOrder/:order_id', passport.authenticate('jwt', {session: false}), OrderController.deleteBundleOrder);

    router.put('/import_log/update', passport.authenticate('jwt', {session: false}), ImportLogController.update);
    router.get('/import_log/get/:params?', passport.authenticate('jwt', {session: false}), ImportLogController.get);
    router.post('/import_log/save', passport.authenticate('jwt', {session: false}), ImportLogController.save);
    router.delete('/import_log/delete/:params', passport.authenticate('jwt', {session: false}), ImportLogController.delete);
    router.get('/import_log/getId/:params', passport.authenticate('jwt', {session: false}), ImportLogController.getById);

    router.put('/operation/update', passport.authenticate('jwt', {session: false}), OperationController.update);
    router.get('/operation/get/:params?', passport.authenticate('jwt', {session: false}), OperationController.get);
    router.post('/operation/save', passport.authenticate('jwt', {session: false}), OperationController.save);
    router.delete('/operation/delete/:params', passport.authenticate('jwt', {session: false}), OperationController.delete);
    router.get('/operation/getId/:params', passport.authenticate('jwt', {session: false}), OperationController.getById);


    router.put('/gpdwork/update', passport.authenticate('jwt', {session: false}), GpdworkController.update);
    router.get('/gpdwork/get/:params?', passport.authenticate('jwt', {session: false}), GpdworkController.get);
    router.post('/gpdwork/save', passport.authenticate('jwt', {session: false}), GpdworkController.save);
    router.delete('/gpdwork/delete/:params', passport.authenticate('jwt', {session: false}), GpdworkController.delete);
    router.get('/gpdwork/getId/:params', passport.authenticate('jwt', {session: false}), GpdworkController.getById);

    router.put('/bundle/update', passport.authenticate('jwt', {session: false}), BundleController.update);
    router.get('/bundle/get/:params?', passport.authenticate('jwt', {session: false}), BundleController.get);
    router.post('/bundle/save', passport.authenticate('jwt', {session: false}), BundleController.save);
    router.delete('/bundle/delete/:params', passport.authenticate('jwt', {session: false}), BundleController.delete);
    router.get('/bundle/getId/:params', passport.authenticate('jwt', {session: false}), BundleController.getById);
    router.get('/bundle/bundleInfo', BundleController.infoBundleAction);
     // router.post('/bundle/saveBundles', BundleController.saveBundles);
    router.get('/bundle/bundleInfoById/:bundle_id', BundleController.infoBundleByIDAction);
    router.get('/bundle/infoCartPendingOperation/:operation_id', BundleController.infoCartPendingOperationAction);
    router.get('/bundle/getIdBundle/:bundle_id', passport.authenticate('jwt', {session: false}), BundleController.findBundleById);
    router.get('/bundle/infoBundleByID', BundleController.infoBundleByID);


    router.put('/usersession/update', passport.authenticate('jwt', {session: false}), UsersessionController.update);
    router.get('/usersession/get/:params?', passport.authenticate('jwt', {session: false}), UsersessionController.get);
    router.post('/usersession/save', passport.authenticate('jwt', {session: false}), UsersessionController.save);
    router.delete('/usersession/delete/:params', passport.authenticate('jwt', {session: false}), UsersessionController.delete);
    router.get('/usersession/getId/:params', passport.authenticate('jwt', {session: false}), UsersessionController.getById);
    router.get('/infoProdDay', UsersessionController.infoProductivityDayAction);

    router.put('/operation_group/update', passport.authenticate('jwt', {session: false}), OperationGroupsController.update);
    router.get('/operation_group/get/:params?', passport.authenticate('jwt', {session: false}), OperationGroupsController.get);
    router.post('/operation_group/save', passport.authenticate('jwt', {session: false}), OperationGroupsController.save);
    router.delete('/operation_group/delete/:params', passport.authenticate('jwt', {session: false}), OperationGroupsController.delete);
    router.get('/operation_group/getId/:params', passport.authenticate('jwt', {session: false}), OperationGroupsController.getById);

    router.put('/cart_pending_operation/update', passport.authenticate('jwt', {session: false}), CartPendingOperationController.update);
    router.get('/cart_pending_operation/get/:params?', passport.authenticate('jwt', {session: false}), CartPendingOperationController.get);
    router.post('/cart_pending_operation/save', passport.authenticate('jwt', {session: false}), CartPendingOperationController.save);
    router.delete('/cart_pending_operation/delete/:params', passport.authenticate('jwt', {session: false}), CartPendingOperationController.delete);
    router.get('/cart_pending_operation/getId/:params', passport.authenticate('jwt', {session: false}), CartPendingOperationController.getById);
    router.get('/cart_pending_operation/get_quantities_by_hour', CartPendingOperationController.quantity_operation_by_hour);
    router.post('/cart_pending_operation/getOperationsByRFID', CartPendingOperationController.getOperationsByRFID);
    router.post('/bundle/saveBundles', CartPendingOperationController.saveBundles);
    router.post('/bundle/generateBundle', CartPendingOperationController.generateBundle);

    router.put('/cart_pending_session/update', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.update);
    router.get('/cart_pending_session/get/:params?', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.get);
    router.post('/cart_pending_session/save', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.save);
    router.delete('/cart_pending_session/delete/:params', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.delete);
    router.get('/cart_pending_session/getId/:params', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.getById);
    router.get('/cart_pending_session/ByOrder/:order_id', passport.authenticate('jwt', {session: false}), CartPendingSerssionController.cartPendingSessionsByOrder);
    router.get('/cart_pending_session/getCPSByOperator/:emp_id/:cpo_id', CartPendingOperationController.getCPSByOperator);



    router.put('/bundle_carts/update', passport.authenticate('jwt', {session: false}), BundleCartsController.update);
    router.get('/bundle_carts/get/:params?', passport.authenticate('jwt', {session: false}), BundleCartsController.get);
    router.post('/bundle_carts/save', passport.authenticate('jwt', {session: false}), BundleCartsController.save);
    router.delete('/bundle_carts/delete/:params', passport.authenticate('jwt', {session: false}), BundleCartsController.delete);
    router.get('/bundle_carts/getId/:params', passport.authenticate('jwt', {session: false}), BundleCartsController.getById);

    router.put('/cart_reopened_operation/update', passport.authenticate('jwt', {session: false}), CartReopenedOperationController.update);
    router.get('/cart_reopened_operation/get/:params?', passport.authenticate('jwt', {session: false}), CartReopenedOperationController.get);
    router.post('/cart_reopened_operation/save', passport.authenticate('jwt', {session: false}), CartReopenedOperationController.save);
    router.delete('/cart_reopened_operation/delete/:params', passport.authenticate('jwt', {session: false}), CartReopenedOperationController.delete);
    router.get('/cart_reopened_operation/getId/:params', passport.authenticate('jwt', {session: false}), CartReopenedOperationController.getById);

    router.put('/operator_productivity/update', passport.authenticate('jwt', {session: false}), OperationProductivityController.update);
    router.get('/operator_productivity/get/:params?', passport.authenticate('jwt', {session: false}), OperationProductivityController.get);
    router.post('/operator_productivity/save', passport.authenticate('jwt', {session: false}), OperationProductivityController.save);
    router.delete('/operator_productivity/delete/:params', passport.authenticate('jwt', {session: false}), OperationProductivityController.delete);
    router.get('/operator_productivity/getId/:params', passport.authenticate('jwt', {session: false}), OperationProductivityController.getById);

    router.get('/gatewayWithaoutAuthenticate/get/:params?',  GatewayController.get);
    router.get('/gatewayWithaoutAuthenticate/getId/:params', GatewayController.getById);

    router.put('/workfile/update', passport.authenticate('jwt', {session: false}), WorkfileController.update);
    router.get('/workfile/get/:params?', passport.authenticate('jwt', {session: false}), WorkfileController.get);
    router.post('/workfile/save', passport.authenticate('jwt', {session: false}), WorkfileController.save);
    router.delete('/workfile/delete/:params', passport.authenticate('jwt', {session: false}), WorkfileController.delete);
    router.get('/workfile/getId/:params', passport.authenticate('jwt', {session: false}), WorkfileController.getById);

    router.put('/report/update', passport.authenticate('jwt', {session: false}), ReportController.update);
    router.get('/report/get/:params?', passport.authenticate('jwt', {session: false}), ReportController.get);
    router.post('/report/save', passport.authenticate('jwt', {session: false}), ReportController.save);
    router.delete('/report/delete/:params', passport.authenticate('jwt', {session: false}), ReportController.delete);
    router.get('/report/getId/:params', passport.authenticate('jwt', {session: false}), ReportController.getById);

    router.put('/token_api_listener/update', passport.authenticate('jwt', {session: false}), TokenApiListenerController.update);
    router.get('/token_api_listener/get/:params?', passport.authenticate('jwt', {session: false}), TokenApiListenerController.get);
    router.post('/token_api_listener/save', passport.authenticate('jwt', {session: false}), TokenApiListenerController.save);
    router.delete('/token_api_listener/delete/:params', passport.authenticate('jwt', {session: false}), TokenApiListenerController.delete);
    router.get('/token_api_listener/getId/:params', passport.authenticate('jwt', {session: false}), TokenApiListenerController.getById);

    router.put('/romboldtxt/update', passport.authenticate('jwt', {session: false}), RomboldtxtController.update);
    router.get('/romboldtxt/get/:params?', passport.authenticate('jwt', {session: false}), RomboldtxtController.get);
    router.post('/romboldtxt/save', passport.authenticate('jwt', {session: false}), RomboldtxtController.save);
    router.delete('/romboldtxt/delete/:params', passport.authenticate('jwt', {session: false}), RomboldtxtController.delete);
    router.get('/romboldtxt/getId/:params', passport.authenticate('jwt', {session: false}), RomboldtxtController.getById);

    router.put('/stat_hour/update', passport.authenticate('jwt', {session: false}), StatHourController.update);
    router.get('/stat_hour/get/:params?', passport.authenticate('jwt', {session: false}), StatHourController.get);
    router.post('/stat_hour/save', passport.authenticate('jwt', {session: false}), StatHourController.save);
    router.delete('/stat_hour/delete/:params', passport.authenticate('jwt', {session: false}), StatHourController.delete);
    router.get('/stat_hour/getId/:params', passport.authenticate('jwt', {session: false}), StatHourController.getById);

    router.put('/stat_day/update', passport.authenticate('jwt', {session: false}), StatDayController.update);
    router.get('/stat_day/get/:params?', passport.authenticate('jwt', {session: false}), StatDayController.get);
    router.post('/stat_day/save', passport.authenticate('jwt', {session: false}), StatDayController.save);
    router.delete('/stat_day/delete/:params', passport.authenticate('jwt', {session: false}), StatDayController.delete);
    router.get('/stat_day/getId/:params', passport.authenticate('jwt', {session: false}), StatDayController.getById);

    router.put('/stat_inst/update', passport.authenticate('jwt', {session: false}), StatInstController.update);
    router.get('/stat_inst/get/:params?', passport.authenticate('jwt', {session: false}), StatInstController.get);
    router.post('/stat_inst/save', passport.authenticate('jwt', {session: false}), StatInstController.save);
    router.delete('/stat_inst/delete/:params', passport.authenticate('jwt', {session: false}), StatInstController.delete);
    router.get('/stat_inst/getId/:params', passport.authenticate('jwt', {session: false}), StatInstController.getById);

    router.put('/stat_month/update', passport.authenticate('jwt', {session: false}), StatMonthController.update);
    router.get('/stat_month/get/:params?', passport.authenticate('jwt', {session: false}), StatMonthController.get);
    router.post('/stat_month/save', passport.authenticate('jwt', {session: false}), StatMonthController.save);
    router.delete('/stat_month/delete/:params', passport.authenticate('jwt', {session: false}), StatMonthController.delete);
    router.get('/stat_month/getId/:params', passport.authenticate('jwt', {session: false}), StatMonthController.getById);

    router.put('/stat_week/update', passport.authenticate('jwt', {session: false}), StatWeekController.update);
    router.get('/stat_week/get/:params?', passport.authenticate('jwt', {session: false}), StatWeekController.get);
    router.post('/stat_week/save', passport.authenticate('jwt', {session: false}), StatWeekController.save);
    router.delete('/stat_week/delete/:params', passport.authenticate('jwt', {session: false}), StatWeekController.delete);
    router.get('/stat_week/getId/:params', passport.authenticate('jwt', {session: false}), StatWeekController.getById);

    router.put('/stat_year/update', passport.authenticate('jwt', {session: false}), StatYearController.update);
    router.get('/stat_year/get/:params?', passport.authenticate('jwt', {session: false}), StatYearController.get);
    router.post('/stat_year/save', passport.authenticate('jwt', {session: false}), StatYearController.save);
    router.delete('/stat_year/delete/:params', passport.authenticate('jwt', {session: false}), StatYearController.delete);
    router.get('/stat_year/getId/:params', passport.authenticate('jwt', {session: false}), StatYearController.getById);

    router.put('/machine_group/update', passport.authenticate('jwt', { session: false }), MachineGroupController.update);
    router.get('/machine_group/get/:params?', passport.authenticate('jwt', { session: false }), MachineGroupController.get);
    router.post('/machine_group/save', passport.authenticate('jwt', { session: false }), MachineGroupController.save);
    router.delete('/machine_group/delete/:params', passport.authenticate('jwt', { session: false }), MachineGroupController.delete);
    router.get('/machine_group/getId/:params', passport.authenticate('jwt', { session: false }), MachineGroupController.getById);
    router.get('/machine_group/updateGroups/:params', passport.authenticate('jwt', { session: false }), MachineGroupController.updateMachineGroup);

    router.put('/skill/update', passport.authenticate('jwt', {session: false}), SkillController.update);
    router.get('/skill/get/:params?', passport.authenticate('jwt', {session: false}), SkillController.get);
    router.post('/skill/save', passport.authenticate('jwt', {session: false}), SkillController.save);
    router.delete('/skill/delete/:params', passport.authenticate('jwt', {session: false}), SkillController.delete);
    router.get('/skill/getId/:params', passport.authenticate('jwt', {session: false}), SkillController.getById);

    router.put('/skill_employee/update', passport.authenticate('jwt', { session: false }), SkillEmployeeController.update);
    router.get('/skill_employee/get/:params?', passport.authenticate('jwt', { session: false }), SkillEmployeeController.get);
    router.post('/skill_employee/save', passport.authenticate('jwt', { session: false }), SkillEmployeeController.save);
    router.delete('/skill_employee/delete/:params', passport.authenticate('jwt', { session: false }), SkillEmployeeController.delete);
    router.get('/skill_employee/getId/:params', passport.authenticate('jwt', { session: false }), SkillEmployeeController.getById);
    router.get('/skill_employee/updateSkills/:params', passport.authenticate('jwt', { session: false }), SkillEmployeeController.updateSkillEmployee);
    router.get('/skill_employee/getskillbyIdEmp/:emp_id', SkillEmployeeController.getskillbyIdEmp);

    router.post('/machine_type/save', passport.authenticate('jwt', {session: false}), MachineTypeController.save);
    router.get('/machine_type/get/:params?', passport.authenticate('jwt', {session: false}), MachineTypeController.get);
    router.put('/machine_type/update', passport.authenticate('jwt', {session: false}), MachineTypeController.update);
    router.delete('/machine_type/delete/:params', passport.authenticate('jwt', {session: false}), MachineTypeController.delete);
    router.get('/machine_type/getId/:params', passport.authenticate('jwt', {session: false}), MachineTypeController.getById);
    router.get('/machine_type/machineParamsTypeByMachineType/:machine_type_id', MachineTypeController.machineParamsTypeByMachineType);

    router.post('/break_type_category/save',  BreakTypeCategorieController.save);
    router.get('/break_type_category/get/:params?', BreakTypeCategorieController.get);
    router.put('/break_type_category/update', BreakTypeCategorieController.update);
    router.delete('/break_type_category/delete/:params', BreakTypeCategorieController.delete);
    router.get('/break_type_category/getId/:params', BreakTypeCategorieController.getById);

    router.post('/operation_template/save',  OperationTemplateController.save);
    router.get('/operation_template/get/:params?', OperationTemplateController.get);
    router.put('/operation_template/update', OperationTemplateController.update);
    router.delete('/operation_template/delete/:params', OperationTemplateController.delete);
    router.get('/operation_template/getId/:params', OperationTemplateController.getById);



    router.post('/article_operation_template/save',  ArticleOperationTemplateController.save);
    router.get('/article_operation_template/get/:params?', ArticleOperationTemplateController.get);
    router.put('/article_operation_template/update', ArticleOperationTemplateController.update);
    router.delete('/article_operation_template/delete/:params', ArticleOperationTemplateController.delete);
    router.get('/article_operation_template/getId/:params', ArticleOperationTemplateController.getById);
    router.get('/article_operation_template/updateOperationTemplates/:params', passport.authenticate('jwt', { session: false }), ArticleOperationTemplateController.updateArticleOperationTemplate);
    router.get('/article_operation_template/getOperationTemplate/:article_id', passport.authenticate('jwt', { session: false }), ArticleOperationTemplateController.getOperationTemplate);


    router.post('/ticket_structure/save', passport.authenticate('jwt', {session: false}), TicketStructureController.save);
    router.get('/ticket_structure/get/:params?', passport.authenticate('jwt', {session: false}), TicketStructureController.get);
    router.put('/ticket_structure/update', passport.authenticate('jwt', {session: false}), TicketStructureController.update);
    router.delete('/ticket_structure/delete/:params', passport.authenticate('jwt', {session: false}), TicketStructureController.delete);
    router.get('/ticket_structure/getOperationByLine/:line_id', passport.authenticate('jwt', {session: false}), TicketStructureController.getOperationByLine);
    router.post('/ticket_structure/insert', passport.authenticate('jwt', {session: false}), TicketStructureController.insert_ticket);
    router.get('/ticket_structure/findTicketFeedById/:ticket_id', TicketStructureController.findTicketFeedById);
    router.get('/ticket_structure/getTicketByLine/:line_id', passport.authenticate('jwt', {session: false}), TicketStructureController.getTicketByLine);
    router.post('/ticket_structure/multiOpen', passport.authenticate('jwt', {session: false}), TicketStructureController.multiOpen);
    router.post('/ticket_structure/openTicket', passport.authenticate('jwt', {session: false}), TicketStructureController.openTicket);
    router.get('/ticket_structure/getTicketFeedByTicket/:ticket_id', passport.authenticate('jwt', {session: false}), TicketStructureController.getTicketFeedByTicket);

    router.post('/status_ticket/save', passport.authenticate('jwt', {session: false}), StatusTicketController.save);
    router.get('/status_ticket/get/:params?', passport.authenticate('jwt', {session: false}), StatusTicketController.get);
    router.put('/status_ticket/update', passport.authenticate('jwt', {session: false}), StatusTicketController.update);
    router.delete('/status_ticket/delete/:params', passport.authenticate('jwt', {session: false}), StatusTicketController.delete);

    router.post('/ticket_feed/save', passport.authenticate('jwt', {session: false}), TicketFeedController.save);
    router.get('/ticket_feed/get/:params?', passport.authenticate('jwt', {session: false}), TicketFeedController.get);
    router.put('/ticket_feed/update', passport.authenticate('jwt', {session: false}), TicketFeedController.update);
    router.delete('/ticket_feed/delete/:params', passport.authenticate('jwt', {session: false}), TicketFeedController.delete);
    router.post('/ticket_feed/insert', passport.authenticate('jwt', {session: false}), TicketFeedController.insert_ticket_feed);
    router.post('/ticket_feed/openTicketFeed', passport.authenticate('jwt', {session: false}), TicketFeedController.openTicketFeed);


    router.post('/ticket_feed_attachment/save', passport.authenticate('jwt', {session: false}), TicketFeedAttachmentController.save);
    router.get('/ticket_feed_attachment/get/:params?', passport.authenticate('jwt', {session: false}), TicketFeedAttachmentController.get);
    router.put('/ticket_feed_attachment/update', passport.authenticate('jwt', {session: false}), TicketFeedAttachmentController.update);
    router.delete('/ticket_feed_attachment/delete/:params', passport.authenticate('jwt', {session: false}), TicketFeedAttachmentController.delete);

    router.get('/auth', EmployeeController.authAction);
    router.get('/logout', EmployeeController.logout);

    router.get('/operationsList', OperationController.getOperationsListOldAction);
    router.get('/resetBundle', OperationController.resetBundle);


    router.post('/sequence/save', passport.authenticate('jwt', {session: false}), SequenceController.save);
    router.get('/sequence/get/:params?', passport.authenticate('jwt', {session: false}), SequenceController.get);
    router.put('/sequence/update', passport.authenticate('jwt', {session: false}), SequenceController.update);
    router.delete('/sequence/delete/:params', passport.authenticate('jwt', {session: false}), SequenceController.delete);
    router.post('/sequence/saveSequences', passport.authenticate('jwt', {session: false}), SequenceController.saveSequences);
    router.get('/sequence/deleteSequences/:sequence_id', passport.authenticate('jwt', {session: false}), SequenceController.deleteSequences);
    router.put('/sequence/update_sequences', passport.authenticate('jwt', {session: false}), SequenceController.updateSequences);

    router.post('/machine_light_status/save', passport.authenticate('jwt', {session: false}), StatusMachineLightController.save);
    router.get('/machine_light_status/get/:params?', passport.authenticate('jwt', {session: false}), StatusMachineLightController.get);
    router.put('/machine_light_status/update', passport.authenticate('jwt', {session: false}), StatusMachineLightController.update);
    router.delete('/machine_light_status/delete/:params', passport.authenticate('jwt', {session: false}), StatusMachineLightController.delete);

    router.post('/machine_light_status_session/save', passport.authenticate('jwt', {session: false}), MachineLightStatusSessionController.save);
    router.get('/machine_light_status_session/get/:params?', passport.authenticate('jwt', {session: false}), MachineLightStatusSessionController.get);
    router.put('/machine_light_status_session/update', passport.authenticate('jwt', {session: false}), MachineLightStatusSessionController.update);
    router.delete('/machine_light_status_session/delete/:params', passport.authenticate('jwt', {session: false}), MachineLightStatusSessionController.delete);

    router.post('/observation/save', passport.authenticate('jwt', {session: false}), ObservationController.save);
    router.get('/observation/get/:params?', passport.authenticate('jwt', {session: false}), ObservationController.get);
    router.put('/observation/update', passport.authenticate('jwt', {session: false}), ObservationController.update);
    router.delete('/observation/delete/:params', passport.authenticate('jwt', {session: false}), ObservationController.delete);
    router.get('/observation/getTicketByObservation/:observation_id', passport.authenticate('jwt', {session: false}), ObservationController.findTicketByObservation);
    router.get('/observation/findObservation', passport.authenticate('jwt', {session: false}), ObservationController.findObservation);

    router.post('/notification/save', NotificationController.save);
    router.get('/notification/get/:params?', NotificationController.findAllNotifications);
    router.put('/notification/update', NotificationController.update);
    router.delete('/notification/delete/:params', NotificationController.delete);
    router.get('/notification/getForSession', NotificationController.getForSession);
    router.get('/notification/readMessageByUser', NotificationController.readMessageByUser);
    // router.get('/notification/findAllNotifications', NotificationController.findAllNotifications);

    router.post('/notification_read/save', NotificationReadController.save);
    router.get('/notification_read/get/:params?', NotificationReadController.get);
    router.put('/notification_read/update', NotificationReadController.update);
    router.delete('/notification_read/delete/:params', NotificationReadController.delete);
    router.get('/notification_read/readAllMessage', NotificationReadController.readAllMessage);

    router.get('/operationFinished', OperationController.operationFinished);
    router.get('/startOperation', OperationController.startOperation);

    router.post('/operation_sequence/save', OperationSequenceController.save);
    router.get('/operation_sequence/get/:params?', OperationSequenceController.get);
    router.put('/operation_sequence/update', OperationSequenceController.update);
    router.delete('/operation_sequence/delete/:params', OperationSequenceController.delete);

    router.post('/status_maintenance/save', StatusMaintenanceController.save);
    router.get('/status_maintenance/get/:params?', StatusMaintenanceController.get);
    router.put('/status_maintenance/update', StatusMaintenanceController.update);
    router.delete('/status_maintenance/delete/:params', StatusMaintenanceController.delete);

    router.post('/maintenance_feed/save', MaintenanceFeedController.save);
    router.get('/maintenance_feed/get/:params?', MaintenanceFeedController.get);
    router.put('/maintenance_feed/update', MaintenanceFeedController.update);
    router.delete('/maintenance_feed/delete/:params', MaintenanceFeedController.delete);
    router.post('/maintenance_feed/insert',  MaintenanceFeedController.insert_maintenance_feed);

    router.post('/maintenance_task/save', MaintenanceTaskController.save);
    router.get('/maintenance_task/get/:params?', MaintenanceTaskController.get);
    router.put('/maintenance_task/update', MaintenanceTaskController.update);
    router.delete('/maintenance_task/delete/:params', MaintenanceTaskController.delete);
    router.post('/maintenance_task/insert', MaintenanceTaskController.insertMaintenanceTask);
    router.get('/maintenance_task/findMaintenanceFeedById/:maintenance_task_id', MaintenanceTaskController.findMaintenanceFeedById);
    router.get('/maintenance_task/addMaintenanceTask', MaintenanceTaskController.addMaintenanceTask);
    router.get('/maintenance_task/findByID/:params?', MaintenanceTaskController.findById);
    router.get('/maintenance_task/getFeeds/:params?', MaintenanceTaskController.getMaintenanceFeedsByTaskMaintenance_id);
    router.get('/maintenance_task/getmechanical_unplanned_maintenance_tasks', MaintenanceTaskController.getmechanical_unplanned_maintenance_tasks);
    router.get('/maintenance_task/total_mechanical_unplanned_maintenance_task', MaintenanceTaskController.total_mechanical_unplanned_maintenance_task);
    router.get('/maintenance_task/getElectronics_unplanned_maintenance_tasks', MaintenanceTaskController.getElectronics_unplanned_maintenance_tasks);
    router.get('/maintenance_task/total_electronic_unplanned_maintenance_task', MaintenanceTaskController.total_electronic_unplanned_maintenance_task);
    router.get('/maintenance_task/views_stats_break_down_per_maintenance_template', MaintenanceTaskController.views_stats_break_down_per_maintenance_template);
    router.get('/maintenance_task/views_stats_break_down_per_machine_type', MaintenanceTaskController.views_stats_break_down_per_machine_type);
    router.get('/maintenance_task/mtsk_onhold_under_repair', MaintenanceTaskController.mtsk_onhold_under_repair);
    router.get('/maintenance_task/mtsk_planned_unplanned_by_source', MaintenanceTaskController.mtsk_planned_unplanned_by_source);
    router.get('/maintenance_task/total_break_down_run_time', MaintenanceTaskController.total_break_down_run_time);
    router.get('/maintenance_task/uplanned_brakedown_records', MaintenanceTaskController.uplanned_brakedown_records);
    router.get('/maintenance_task/views_mechanical_availability', MaintenanceTaskController.views_mechanical_availability);
    router.get('/maintenance_task/getByMachineID', MaintenanceTaskController.getByMachineID);
    router.get('/maintenance_task/mtsk_planned_by_source', MaintenanceTaskController.mtsk_planned_by_source);


    router.post('/start_maintenanceTask', MaintenanceTaskController.startMaintenanceFeed);
    router.post('/finished_maintenanceTask', MaintenanceTaskController.taskMaintenanceFinished);
    router.get('/opened_maintenanceTask/:params?', MaintenanceTaskController.openedMaintenanceTask);
    router.get('/get_opened_maintenance_tasks', MaintenanceTaskController.openedmaintenanceTaskList);

    router.post('/machine_events/save', MachineEventsController.save);
    router.get('/machine_events/get/:params?', MachineEventsController.get);
    router.put('/machine_events/update', MachineEventsController.update);
    router.delete('/machine_events/delete/:params', MachineEventsController.delete);
    router.get('/machine_events/getByMachineId/:machine_id', MachineEventsController.getByMachineId);

    router.post('/priorities/save', PriorityController.save);
    router.get('/priorities/get/:params?', PriorityController.get);
    router.put('/priorities/update', PriorityController.update);
    router.delete('/priorities/delete/:params', PriorityController.delete);


    router.post('/maintenance_template/save', MaintenanceTemplateController.save);
    router.get('/maintenance_template/get/:params?', MaintenanceTemplateController.get);
    router.put('/maintenance_template/update', MaintenanceTemplateController.update);
    router.delete('/maintenance_template/delete/:params', MaintenanceTemplateController.delete);
    router.get('/maintenance_template/getByDepartement', MaintenanceTemplateController.getByDepartement);
    router.get('/maintenance_template/findByID/:params?', MaintenanceTemplateController.findById);
    router.put('/maintenance_template/updateObject', MaintenanceTemplateController.updateObject);


    router.get('/productivityDay', UsersessionController.productivityDay);
    router.get('/usersessionStatByDay', UsersessionController.view_operators_session);
    router.get('/usersessionStatInfoByDay', UsersessionController.operators_sessions_info);
    router.get('/usersessionStatInfoByDayByLine', UsersessionController.employee_state_by_day_by_line);

    router.get('/produce_quantity', UsersessionController.produce_quantity);
    router.get('/produce_quantity_by_week', UsersessionController.produce_quantity_by_week);
    router.get('/Production_quantity_Bydate', UsersessionController.Production_quantity_Bydate);
    router.get('/machines_break_down', MaintenanceTaskController.view_mtsk_unplanned);
    router.get('/global_productivity', UsersessionController.global_productivity);
    router.get('/global_productivity_by_week', UsersessionController.global_productivity_by_week);
    router.get('/productivity_operator', UsersessionController.productivity_operator);
    router.get('/global_productivity_by_line', UsersessionController.global_productivity_by_line);
    router.get('/global_productivity_all_line', UsersessionController.global_productivity_all_line);
    router.get('/global_productivity_by_day_per_week', UsersessionController.global_productivity_by_day_per_week);
    router.get('/global_productivity_employee_by_day', UsersessionController.global_productivity_employee_by_day);
    router.get('/global_productivity_employee_by_week', UsersessionController.global_productivity_employee_by_week);
    router.get('/global_productivity_by_hour', UsersessionController.global_productivity_by_hour);
    router.get('/global_productivity_by_hour_line', UsersessionController.global_productivity_by_hour_line);
    router.get('/global_productivity_by_week_by_day', UsersessionController.global_productivity_by_week_by_day);
    router.get('/global_productivity_by_week_by_day_line', UsersessionController.global_productivity_by_week_by_day_line);


    router.get('/get_user_logged_in_current_day', EmployeeController.get_user_logged_in_current_day);
    router.get('/get_operators', EmployeeController.get_operators);
    router.get('/get_total_employee_and_logged_employee', EmployeeController.get_total_employee_and_logged_employee);

    
    router.post('/mt-box/save', MtBoxBuildsController.save);
    router.get('/mt-box/get/:params?', MtBoxBuildsController.get);
    router.put('/mt-box/update' , MtBoxBuildsController.update);
    router.delete('/mt-box/delete/:params', MtBoxBuildsController.delete);
    router.get('/mt-box/getId/:params', MtBoxBuildsController.getById);
    router.get('/mt-box/findByID/:params?', MtBoxBuildsController.findById);
    router.get('/mt-box/download-build/last', MtBoxBuildsController.last_version);
    router.get('/mt-box/download-build', MtBoxBuildsController.download_build_by_id);
    router.get('/mt-box/box_version/:box_macaddress', MtBoxBuildsController.box_version);


    router.post('/direct_production_mode/save', DirectProductionModeController.save);
    router.get('/direct_production_mode/get/:params?', DirectProductionModeController.get);
    router.put('/direct_production_mode/updateObject', DirectProductionModeController.updateObject);
    router.delete('/direct_production_mode/delete/:params', DirectProductionModeController.delete);
    router.put('/direct_production_mode/update', DirectProductionModeController.update);

    router.post('/operation_direct_production_mode/save', OperationDirectProductionModeController.save);
    router.get('/operation_direct_production_mode/get/:params?', OperationDirectProductionModeController.get);
    router.put('/operation_direct_production_mode/updateObject', OperationDirectProductionModeController.updateObject);
    router.put('/operation_direct_production_mode/update', OperationDirectProductionModeController.update);
    router.delete('/operation_direct_production_mode/delete/:params', OperationDirectProductionModeController.delete);
    router.put('/operation_direct_production_mode/updateOrders', DirectProductionModeController.updateOrders)

    router.post('/stock_production_product/save', StockProductionProductController.save);
    router.get('/stock_production_product/get/:params?', StockProductionProductController.get);
    router.put('/stock_production_product/update', StockProductionProductController.update);
    router.delete('/stock_production_product/delete/:params', StockProductionProductController.delete);
    router.get('/stock_production_product/getId/:stock_production_product_id', StockProductionProductController.findStockById);
    router.post('/stock_production_product/multipleStock', StockProductionProductController.multipleStock);

    router.post('/receipt/save', ReceiptController.save);
    router.get('/receipt/get/:params?', ReceiptController.get);
    router.put('/receipt/update', ReceiptController.update);
    router.delete('/receipt/delete/:params', ReceiptController.delete);

    router.post('/devise/save', DeviseController.save);
    router.get('/devise/get/:params?', DeviseController.get);
    router.put('/devise/update', DeviseController.update);
    router.delete('/devise/delete/:params', DeviseController.delete);


    router.post('/generate_direct_production_bundle', OperationController.generate_direct_production);

    router.get('/getOperationsTemplateByLine', OperationController.getOperationsTemplateByLine);

    router.get('/getOperationsTemplateByDirectProductionMode', DirectProductionModeController.getOperationTemplateByDirectProductionMode);


    router.post('/production_product/save', ProductionProductController.save);
    router.get('/production_product/get/:params?', ProductionProductController.get);
    router.put('/production_product/update', ProductionProductController.update);
    router.delete('/production_product/delete/:params', ProductionProductController.delete);
    router.put('/production_product/updateObject', ProductionProductController.updateObject);


    router.post('/production_product_provider/save', ProductionProductProviderController.save);
    router.get('/production_product_provider/get/:params?', ProductionProductProviderController.get);
    router.put('/production_product_provider/update', ProductionProductProviderController.update);
    router.delete('/production_product_provider/delete/:params', ProductionProductProviderController.delete);
    router.put('/production_product_provider/updateObject', ProductionProductProviderController.updateObject);


    router.post('/deposit/save', DepositController.save);
    router.get('/deposit/get/:params?', DepositController.get);
    router.put('/deposit/update', DepositController.update);
    router.delete('/deposit/delete/:params', DepositController.delete);
    router.put('/deposit/updateObject', DepositController.updateObject);


    router.post('/category_product/save', CategoryProductController.save);
    router.get('/category_product/get/:params?', CategoryProductController.get);
    router.put('/category_product/update', CategoryProductController.update);
    router.delete('/category_product/delete/:params', CategoryProductController.delete);
    router.put('/category_product/updateObject', CategoryProductController.updateObject);
    router.get('/category_product/productByCategory/:category_product_id', CategoryProductController.productByCategory);

    router.post('/taking/save', TakingController.save);
    router.get('/taking/get/:params?', TakingController.get);
    router.put('/taking/update', TakingController.update);
    router.delete('/taking/delete/:params', TakingController.delete);
    router.put('/taking/updateObject', TakingController.updateObject);
    router.post('/taking/add', TakingController.ajouterPrelevement);
    router.delete('/taking/cancel', TakingController.annulerPrelevement);
    router.get('/taking/findByID/:params?', TakingController.findById);-
    router.get('/taking/info/:id', TakingController.info);
    router.get('/taking/updateObject', TakingController.updateObject);
    router.put('/taking/updateTaking', TakingController.updateTaking);

    router.post('/artile_production_product/save', ArticleProductionProductController.save);
    router.get('/artile_production_product/get/:params?', ArticleProductionProductController.get);
    router.put('/artile_production_product/update', ArticleProductionProductController.update);
    router.delete('/artile_production_product/delete/:params', ArticleProductionProductController.delete);
    router.put('/artile_production_product/updateObject', ArticleProductionProductController.updateObject);
    router.post('/artile_production_product/addProducts', ArticleProductionProductController.addProducts);
    router.get('/artile_production_product/getProducts/:article_id', ArticleProductionProductController.getProducts);
    router.put('/artile_production_product/updateProducts', ArticleProductionProductController.updateProducts);
    router.get('/artile_production_product/deleteProducts/:article_id', ArticleProductionProductController.deleteProducts);

    router.post('/machine_event_type/save', MachineEventTypeController.save);
    router.get('/machine_event_type/get/:params?', MachineEventTypeController.get);
    router.put('/machine_event_type/update', MachineEventTypeController.update);
    router.delete('/machine_event_type/delete/:params', MachineEventTypeController.delete);
    router.put('/machine_event_type/updateObject', MachineEventTypeController.updateObject);

    router.post('/machine_params/save', MachineParamsController.save);
    router.get('/machine_params/get/:params?', MachineParamsController.get);
    router.put('/machine_params/update', MachineParamsController.update);
    router.delete('/machine_params/delete/:params', MachineParamsController.delete);
    router.get('/machine_params/generate_works', MachineParamsController.generateWork);

    router.post('/machine_params_type/save', MachineParamsTypeController.save);
    router.get('/machine_params_type/get/:params?', MachineParamsTypeController.get);
    router.put('/machine_params_type/update', MachineParamsTypeController.update);
    router.delete('/machine_params_type/delete/:params', MachineParamsTypeController.delete);
    router.get('/machine_params_type/machineParamsByMachineParamsType/:machine_params_type_id', MachineParamsTypeController.machineParamsByMachineParamsType);


    router.post('/events/save', EventsController.save);
    router.get('/events/get/:params?', EventsController.get);
    router.put('/events/update', EventsController.update);
    router.delete('/events/delete/:params', EventsController.delete);


    router.get('/currentDate', UsersessionController.getDate);


    
    
    router.get('/cart_pending_session/total_qauntity_by_operator', CartPendingSerssionController.total_qauntity_by_operator);
    router.get('/cart_pending_session/getCpsByDateAndOperator', CartPendingSerssionController.getCpsByDateAndOperator);
    router.post('/cart_pending_session/getCpsOperation', CartPendingSerssionController.getCpsOperation);


    // usersession Stat by day -- sfax
    router.get('/usersessionStatByDay2', CartPendingSerssionController.usersessionStatByDay2);


    router.post('/machine_operation_template/save', MachineOperationTemplateController.save);
    router.get('/machine_operation_template/get/:params?', MachineOperationTemplateController.get);
    router.put('/machine_operation_template/update', MachineOperationTemplateController.update);
    router.delete('/machine_operation_template/delete/:params', MachineOperationTemplateController.delete);
    router.get('/machine_operation_template/getOperationTemplateList', MachineOperationTemplateController.getOperationTemplateList);
    router.get('/machine_operation_template/updateOperationTemplates/:params', passport.authenticate('jwt', { session: false }), MachineOperationTemplateController.updateMachineOperationTemplate);
    router.get('/machine_operation_template/getOperationTemplate/:machine_id', passport.authenticate('jwt', { session: false }), MachineOperationTemplateController.getOperationTemplate);
    router.get('/machine_operation_template/getOperationList', MachineOperationTemplateController.getOperationList);
    router.post('/machine_operation_template/getOperationList_others', MachineOperationTemplateController.getOperationList_others);



    router.get('/produce_quantity_reparation', UsersessionController.produce_quantity_reparation);
    router.get('/produce_quantity_stat', UsersessionController.produce_quantity_stat);
    router.get('/produce_quantity_stat_by_line', UsersessionController.produce_quantity_stat_by_line);
    router.get('/produce_quantity_stat_by_day', UsersessionController.produce_quantity_stat_by_day);
    router.get('/produce_quantity_stat_by_line_by_day', UsersessionController.produce_quantity_stat_by_line_by_day);



    router.get('/release_operation', CartPendingSerssionController.release_operation);


    router.get('/skill_operations/updateSkills/:params', passport.authenticate('jwt', { session: false }), Skill_operationController.updateSkilloperations);
    router.get('/skill_operations/getskillbyIdOperation/:operation_template_id',passport.authenticate('jwt', { session: false }), Skill_operationController.getskillbyIdOperation);
    router.post('/skill_operations/save',passport.authenticate('jwt', { session: false }), Skill_operationController.save);
    router.get('/machine/getAllbundleBymachineBylines/:line_id', MachineController.getAllbundleBymachineBylines);
    router.get('/machine/getallmachinebylinebyallsite/:site_id', MachineController.getallmachinebylinebyallsite);
    router.get('/machine/getallbundlemachinebylinebysite/:site_id/:line_id', MachineController.getallbundlemachinebylinebysite);
    router.get('/line/getlinesbysite/:site_id',  LineController.getlinesbysite);


    router.get('/cart_pending_session/produced_quantity_day', CartPendingOperationController.produced_quantity_day);
    router.get('/produce_quantity_by_line_hours', CartPendingSerssionController.produce_quantity_by_line_hours);
    router.get('/produce_quantity_by_line_days', CartPendingSerssionController.produce_quantity_by_line_days);

    router.get('/maintenaceTemp_MachineType/update_MaintenaceTemplate_Machinetype/:params', MtemplateMtypeController.update_MaintenaceTemplate_Machinetype);
    router.get('/maintenaceTemp_MachineType/getmachinetypebyidmaintenance/:maintenance_template_id', MtemplateMtypeController.get_machine_type_by_id_maintenance);
    router.get('/maintenaceTemp_MachineType/get_machine_type_Info/:maintenance_template_id', MtemplateMtypeController.get_machine_type_Info);
    router.post('/maintenaceTemp_MachineType/save', MtemplateMtypeController.save);

    router.get('/maintenance_template/getByDepartementbtmachine_Type', MaintenanceTemplateController.getByDepartementbtmachine_Type);

    router.get('/order/get_order_Info/:params?', OrderController.get_order_Info);

    router.get('/bundle/codeBundles', BundleController.codeBundles);
    router.get('/order/codeOrders', OrderController.codeOrders);
    router.get('/order/get_bundles_info_by_order/:order_id/:size', OrderController.get_bundles_info_by_order);
    router.get('/order/get_order_info_by_size/:order_id', OrderController.get_order_info_by_size);
    router.get('/order/findByCode', OrderController.findByCode);



    router.put('/line_article/update', passport.authenticate('jwt', {session: false}), LineArticleController.update);
    router.get('/line_article/get/:params?', passport.authenticate('jwt', {session: false}), LineArticleController.get);
    router.post('/line_article/save', passport.authenticate('jwt', {session: false}), LineArticleController.save);
    router.delete('/line_article/delete/:params', passport.authenticate('jwt', {session: false}), LineArticleController.delete);
    router.get('/line_article/getId/:params', passport.authenticate('jwt', {session: false}), LineArticleController.getById);

    router.post('/getOperationsTemplate',  OperationTemplateController.getOperationsTemplate);


    return router;
};

module.exports = APIRoutes;







