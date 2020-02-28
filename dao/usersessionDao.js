const {baseModelDao} = require('./baseModalDao');
var sequelize = require('sequelize');
var moment = require('moment');

class UsersessionsDao extends baseModelDao {
    constructor() {
        super('usersessions', 'usersession_id');
        this.baseModal = 'usersessions';
        this.primaryKey = 'usersession_id';
        this.Y = 'Y';
    }

    infoProductivityDayAction(req, res, next) {
        let rfid = req.query.rfid;
        if (rfid === null || rfid === '') {
            res.json({message: "ADDR_NOT_PROVIDED"})
        } else {
            rfid = parseInt(rfid, 16).toString(16).substr(0, 10);
            this.db['usersessions'].findOne(
                {
                    include: [
                        {
                            model: this.db['employees'],
                            where:
                                {
                                    emp_rfid: rfid
                                }
                        },
                    ],

                }).then(function (usersessions) {
                    if (!usersessions) {
                        res.send({
                            "_msg": "USER_NOT_EXIST",
                        });
                    } else if (usersessions) {
                        res.json({
                            message: 'Success',
                            user_session: usersessions,
                            success: true,
                            result: 1
                        });
                    }
                }
            ).catch(function (error) {
                console.log(error);
                res.status(500).json({message: 'INTERNAL_SERVER_ERROR', error: error});
            });
        }
    }

    productivityDay(req, res, next) {

        let usersession_id = req.query.usersession_id;
        if (usersession_id === null || usersession_id === '') {
            res.json({
                success: false,
                data: null,
                messages: [{
                    userMessage: "Invalid usersession data",
                    internalMessage: 'Invalid user session data',
                    code: 1006,
                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1006"
                }],
                attributes: [],
                status: 500
            });
            return;
        }
        let db = require('../models');

        // let sql = 'SELECT vesd.* FROM usersessions as us ' +
        //                    'LEFT JOIN views_employee_stats_by_day as vesd on vesd.day_session = TO_CHAR(us.time_in::DATE, \'yyyymmdd\') and us.employee_id = vesd.employee_id ' +
        //        'WHERE us.usersession_id = '+usersession_id+' and us.active = \'Y\'';

        let sql = 'SELECT vesd.*, vesd.reparation FROM usersessions as us\n' +
            'LEFT JOIN views_employee_stats_by_day_with_reparation as vesd on vesd.day_session = TO_CHAR(us.time_in::DATE, \'yyyymmdd\') \n' +
            'and us.employee_id = vesd.employee_id \n' +
            'WHERE us.usersession_id = ' + usersession_id + ' and us.active = \'Y\''
        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(vesd => {
                if (vesd) {
                    res.json({
                        success: true,
                        data: vesd,
                        messages: [{
                            userMessage: "Info user_sessions_status_by_day with success",
                            internalMessage: 'Info user_sessions_status_by_day with success',
                            code: 1035
                        }],
                        attributes: [],
                        status: 200
                    });
                } else {
                    res.json({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "Info user_sessions_status_by_day not exists",
                            internalMessage: 'Info user_sessions_status_by_day not exists',
                            code: 1036
                        }],
                        attributes: [],
                        status: 500
                    });
                }

            })


    }

    view_operators_session(req, res, next) {
        let db = require('../models');

        var params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};
        let state_date = req.query.stats_date;

        let session_status = req.query.session_status;

        let line_id = req.query.line_id;

        console.log('line_id', line_id)
        if (!session_status || session_status === undefined || session_status === 'all') {


            if (line_id === undefined || line_id === 'all' || line_id === '') {
                console.log('1')
                let sql = 'select DISTINCT(vesd.*) ,e.emp_matricule,  e.emp_name, e.emp_lastname, e.profile_image_id from views_employee_stats_by_day as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'WHERE vesd.day_session = \'' + state_date + '\'';
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })

                    })
            } else {
                console.log('2')
                let sql = 'select * from views_employee_stats_by_day_line as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'WHERE vesd.day_session = \'' + state_date + '\' and line_id = ' + line_id;
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })
                    })
            }

        } else {
            if (line_id === undefined || line_id === 'all' || line_id === '') {
                console.log('3')

                let sql = 'select DISTINCT(vesd.*) , e.emp_name, e.emp_lastname, e.profile_image_id from views_employee_stats_by_day as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'WHERE vesd.day_session = \'' + state_date + '\'\n and session_status =\'' + session_status + '\'\n';
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })

                    })
            } else {
                console.log('4')
                let sql = 'select * from views_employee_stats_by_day_by_line as vesd\n' +
                    'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                    'WHERE vesd.day_session = \'' + state_date + '\' and line_id = ' + line_id + ' and session_status =\'' + session_status + '\'\n';
                db.sequelize.query(sql,
                    {type: db.sequelize.QueryTypes.SELECT})
                    .then(data => {
                        res.send({
                            success: true,
                            data: data
                        })
                    })
            }

        }


    }

    operators_sessions_info(req, res, next) {
        let db = require('../models');

        var params = req.query.params;
        let user_id = req.query.user_id;
        let date = req.query.date;


        let sql = 'select v.*, op.bundle_id, op.line_id, op.label as operation_label, b.code_bundle, b.order_id, o.code as order_code, o.label as order_label, o.article_id, o.description as code_description from views_cps_data as v\n' +
            'LEFT JOIN cart_pending_operations as cpo on v.cart_pendingoperation_id = cpo.cart_pending_operation_id\n' +
            'LEFT JOIN operations as op on op.operation_id = cpo.operation_id\n' +
            'LEFT JOIN bundles as b on b.bundle_id = op.bundle_id\n' +
            'LEFT JOIN orders as o on b.order_id = o.order_id\n' +
            'where v.employee_id=' + user_id + 'and v.date_operation =\'' + date + '\''

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }

    employee_state_by_day_by_line(req, res, next) {
        let db = require('../models');

        var params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};
        let state_date = req.query.stats_date;

        let session_status = req.query.session_status;
        let line_id = req.query.line_id

        if (!session_status || session_status === undefined || session_status === 'all') {
            let sql = 'select * from views_employee_stats_by_day_by_line as vesd\n' +
                'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                'WHERE vesd.day_session = \'' + state_date + '\' and line_id = ' + line_id;
            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        } else {

            let sql = 'select * from views_employee_stats_by_day_by_line as vesd\n' +
                'LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                'WHERE vesd.day_session = \'' + state_date + '\' and line_id = ' + line_id + '\'\n and session_status =\'' + session_status + '\'\n';
            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }

    }

    produce_quantity(req, res, next) {

        let db = require('../models');
        let state_date = req.query.state_date
        let sql = 'SELECT  SUM(min_quantity_produced) as quantity_produced, SUM(quantity_in_production) as quantity_in_production, \n ' +
            'SUM(bundle_qte) as all_quantities \n ' +
            'FROM views_production_data';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    produce_quantity_by_week(req, res, next) {

        let db = require('../models');
        let state_date = req.query.state_date
        var end_date = moment(state_date, "YYYYMMDD").add(5, 'days').format('YYYYMMDD')
        let sql = 'SELECT cpo.dateend,\n' +
            'SUM(min_quantity_produced) as quantity_produced,\n' +
            'SUM(quantity_in_production) - SUM(min_quantity_produced) as quantity_in_production,\n' +
            'SUM(bundle_qte) as all_quantities\n' +
            'FROM views_production_data,cart_pending_operations cpo\n' +
            'WHERE cpo.dateend BETWEEN ' + " ' " + state_date + "'" + 'AND ' + " ' " + end_date + " ' \n" +
            '\n' +
            'Group By cpo.dateend';


        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    global_productivity(req, res, next) {

        let db = require('../models');

        let state_date = req.query.state_date


        // let sql = 'select sum(v1.global_productivity) / count(v1.line_id) as global_productivity from (\t select l.line_id, sum(productivity) as global_productivity , l.line_label from views_employee_stats_by_day_line as vesd\n' +
        //     '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
        //     '                LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
        //     '                WHERE vesd.day_session =  \'' + state_date + '\'\n' +
        //     '                Group by l.line_id) as v1'

        let sql = 'select sum(v1.global_productivity)/ count(v1.line_id) as global_productivity from (select l.line_id, sum(productivity)/ count(vesd.employee_id ) as global_productivity , l.line_label from views_employee_stats_by_day_line as vesd\n' +
            '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
            '                LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
            '                WHERE vesd.day_session =  \'' + state_date + '\'\n' +
            '                Group by l.line_id) as v1'
        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }


    /* global_productivity(req, res, next ) {

         let db = require('../models');

         let state_date = req.query.state_date

         let sql = 'SELECT count(vcoqpd.*) as total_employees, \n' +
         'SUM(vcoqpd.productivity)/count(vcoqpd.*) as global_productivity \n' +
         'FROM views_cps_operations_quantity_productivity_by_day as vcoqpd \n' +
         'WHERE vcoqpd.date_operation = \''+ state_date + '\'\n' +
         'GROUP BY vcoqpd.date_operation' ;

         db.sequelize.query(sql,
             {type: db.sequelize.QueryTypes.SELECT})
             .then(data => {
                 res.send({
                     success: true,
                     data: data
                 })
             })
     }*/

    global_productivity_by_week(req, res, next) {

        let db = require('../models');

        let state_date = req.query.state_date
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')
        /*let sql = 'SELECT SUM (global_productivity) \n' +
        '\n' +
        'from (SELECT count(vcoqpd.*) as total_employees,\n' +
            'SUM(vcoqpd.productivity)/count(vcoqpd.*) as global_productivity\n' +
            '\n' +
            'FROM views_cps_operations_quantity_productivity_by_day as vcoqpd\n' +
            '\n' +
            'WHERE vcoqpd.date_operation BETWEEN ' + '\''+ state_date + '\'' +  'AND ' + '\''+ end_date + '\' \n' +
            '\n' +
            'GROUP BY vcoqpd.date_operation) AS Total';*/

        let sql = 'Select CASE WHEN SUM (global_productivity) IS NOT NULL THEN  SUM (global_productivity) else 0 END  as global_productivity \n' +
            '\n' +
            'from (SELECT count(vesd.*) as total_employees,\n' +
            'SUM(vesd.productivity)/count(vesd.*) as global_productivity\n' +
            'FROM views_employee_stats_by_day as vesd\n' +


            'WHERE vesd.day_session BETWEEN ' + '\'' + state_date + '\'' + 'AND ' + '\'' + end_date + '\' \n' +

            'GROUP BY vesd.day_session) AS Total';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }


    getDate(req, res, next) {
        let date = new Date()
        // res.send(moment().format('YYYYMMDDHH:mm:ss'))
        let format = (req.query && req.query.format) ? req.query.format : 'full'
        if (format === 'date') {
            res.send(moment().format('YYYYMMDD'));
            return;
        } else if (format === 'time') {
            res.send(moment().format('HH:mm:ss'));
            return;
        }
        res.send({
            datetime: moment().format('YYYYMMDDHH:mm:ss'),
            timezone_name: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezone_offset: new Date().getTimezoneOffset(),
        });
        // res.send(moment().format('YYYYMMDDHH:mm:ss'));
        return;
    }

    Production_quantity_Bydate(req, res, next) {
        let state_date = req.query.state_date

        let db = require('../models');
        let sql = "SELECT cpo.bundle_id,\n" +
            "cpo.dateend,\n" +
            "b.bundle_qte,\n" +
            "sum(op.quantity) AS operations_quantity,\n" +
            "count(op.operation_id) AS operations_count,\n" +
            "min(cpo.quantity) AS min_quantity_produced,\n" +
            "max(cpo.quantity) AS max_quantity_produced,\n" +
            "max(cpo2.quantity) AS quantity_in_production,\n" +
            "sum(cpo.finished) AS total_finished,\n" +
            "CASE WHEN sum(cpo.finished) = count(op.operation_id) THEN 1 ELSE 0 END AS operations_finished FROM bundles b LEFT JOIN operations op ON op.bundle_id = b.bundle_id AND op.active ='Y'::text LEFT JOIN cart_pending_operations cpo ON op.operation_id = cpo.operation_id AND cpo.active =\'Y\' ::text LEFT JOIN cart_pending_operations cpo2 ON op.operation_id = cpo2.operation_id AND cpo2.active =\'Y\' AND cpo2.finished = 0 WHERE b.active =\'Y\'::text And cpo.dateend=\'" + state_date + '\'\n' +
            '\n' + "GROUP BY cpo.bundle_id, b.bundle_qte,cpo.dateend";

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    /**Productivity Operator Sfax */
    productivity_operator(req, res, next) {
        let state_date = req.query.state_date
        let db = require('../models');
        let sql = ' SELECT vcoqd.emp_id ,\n' +
            'vcoqd.emp_name,\n' +
            'vcoqd.emp_lastname,\n' +
            'vcoqd.date_operation,\n' +
            'CASE\n' +
            'WHEN date_part(\'dow\'::text, vcoqd.date_operation::date) = ANY (ARRAY[1::double precision, 2::double precision, 3::double precision, 4::double precision]) THEN ( SELECT sum(vcoqd2."time" * 60::double precision * vcoqd2.quantity::double precision) / (460 * 60)::double precision * 100::double precision \n' +
            'FROM views_cps_operations_quantity_by_day vcoqd2  \n' +
            'WHERE vcoqd2.emp_id = vcoqd.emp_id AND vcoqd2.date_operation = vcoqd.date_operation) \n' +
            'WHEN date_part(\'dow\'::text, vcoqd.date_operation::date) = 5::double precision THEN ( SELECT sum(vcoqd2."time" * 60::double precision * vcoqd2.quantity::double precision) / (520 * 60)::double precision * 100::double precision \n' +
            'FROM views_cps_operations_quantity_by_day vcoqd2 \n' +
            'WHERE vcoqd2.emp_id = vcoqd.emp_id AND vcoqd2.date_operation = vcoqd.date_operation) \n' +
            'ELSE ( SELECT sum(vcoqd2."time" * 60::double precision * vcoqd2.quantity::double precision) / (345 * 60)::double precision * 100::double precision \n' +
            'FROM views_cps_operations_quantity_by_day vcoqd2 \n' +
            'WHERE vcoqd2.emp_id = vcoqd.emp_id AND vcoqd2.date_operation = vcoqd.date_operation) \n' +
            'END AS productivity \n' +
            'FROM views_cps_operations_quantity_by_day vcoqd \n' +
            'WHERE vcoqd.date_operation = \'' + state_date + '\'\n' +
            'GROUP BY vcoqd.emp_id, vcoqd.emp_name, vcoqd.emp_lastname, vcoqd.date_operation \n';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    produce_quantity_reparation(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date
        let sql = 'SELECT  SUM(min_quantity_produced) as quantity_produced, sum(min_reparation) as reparation_qte,\n' +
            'SUM(bundle_qte) as all_quantities \n' +
            'FROM views_production_data_reparation';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }


    produce_quantity_stat(req, res, next) {
        let db = require('../models');
        let sql = 'SELECT  SUM(min_quantity_produced) as finished, sum(min_reparation) as reparation,\n' +
            'SUM(bundle_qte) as total_qte ,  SUM(quantity_in_production) as in_progress, (SUM(bundle_qte) - (SUM(min_quantity_produced) + SUM(quantity_in_production)) ) as not_started\n' +
            'FROM views_production_data_reparation\n';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }


    global_productivity_by_line(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        let line_id = req.query.line_id;

        let sql = 'SELECT count(vesd.*) as total_employees, l.line_label,l.line_id,\n' +
            'SUM(vesd.productivity)/count(vesd.*) as global_productivity\n' +
            'FROM views_employee_stats_by_day_hour_line as vesd\n' +
            'LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
            'WHERE vesd.day_session =  \'' + state_date + '\' and vesd.line_id = ' + line_id + ' \n' +
            'GROUP BY vesd.day_session, l.line_label,l.line_id';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }


    global_productivity_all_line(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        let line_id = req.query.line_id;
        if (line_id === null || line_id === undefined || line_id === 'all') {
            // let sql = '\tselect l.line_id, sum(productivity) as global_productivity , l.line_label from views_employee_stats_by_day_line as vesd\n' +
            //     '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
            //     '                LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
            //     '                WHERE vesd.day_session =  \'' + state_date + '\'\n' +
            //     '                Group by l.line_id'

            let sql = 'select l.line_id, sum(productivity)/ count(vesd.employee_id ) as global_productivity , l.line_label from views_employee_stats_by_day_line as vesd\n' +
                '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                '                LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
                '                WHERE vesd.day_session =  \'' + state_date + '\' \n' +
                '                Group by l.line_id'

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        } else {
            let sql = 'select l.line_id, sum(productivity)/ count(vesd.employee_id ) as global_productivity , l.line_label from views_employee_stats_by_day_line as vesd\n' +
                '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                '                LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
                '                WHERE vesd.day_session =  \'' + state_date + '\' and l.line_id = ' + line_id + ' \n' +
                '                Group by l.line_id'

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }

    }

    global_productivity_by_day_per_week(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')
        let line_id = req.query.line_id;
        if (line_id === null || line_id === undefined || line_id === 'all') {
            let sql = 'SELECT CASE WHEN SUM (vgpd.global_productivity) IS NOT NULL THEN  SUM (vgpd.global_productivity) else 0 END  as global_productivity, vgpd.line_label,vgpd.line_id from views_global_productivity_by_day vgpd\n' +
                'WHERE vgpd.day_session BETWEEN  ' + '\'' + state_date + '\'' + 'AND ' + '\'' + end_date + '\'\n' +
                'GROUP BY vgpd.line_id , vgpd.line_label';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        } else {
            let sql = ' SELECT count(vgpd.*) as total_lines, vgpd.line_label,vgpd.line_id,\n' +
                '                            SUM (global_productivity) as global_productivity\n' +
                '                            FROM views_global_productivity_by_day as vgpd\n' +
                '                            WHERE vgpd.day_session   BETWEEN ' + '\'' + state_date + '\'' + 'AND ' + '\'' + end_date + '\'' + 'and vgpd.line_id =' + line_id + ' \n' +
                '                            GROUP BY  vgpd.line_label,vgpd.line_id';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }


    }

    global_productivity_employee_by_day(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')
        let line_id = req.query.line_id;
        if (line_id === null || line_id === undefined || line_id === 'all') {
            let sql = 'select * from views_employee_stats_by_day_line as vesd\n' +
                '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                '                WHERE vesd.day_session =\'' + state_date + '\'\n' ;

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }
         else {
            let sql = 'select * from views_employee_stats_by_day_line as vesd\n' +
                '                LEFT JOIN employees as e on e.emp_id = vesd.employee_id \n' +
                '                WHERE vesd.day_session =  \'' + state_date + '\' and line_id = ' + line_id + ' \n'

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })}

    }


    global_productivity_employee_by_week(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')
        let line_id = req.query.line_id;
        if (line_id === null || line_id === undefined || line_id === 'all') {
            let sql = 'SELECT count(vesd.*) as total_employees, l.line_label,l.line_id,\n' +
                'SUM(vesd.productivity)/count(vesd.*) as global_productivity\n' +
                'FROM views_employee_stats_by_day_hour_line as vesd\n' +
                'LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
                'WHERE vesd.day_session =  \'' + state_date + '\'\n' +
                'GROUP BY vesd.day_session, l.line_label,l.line_id';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }
        else { let sql = 'SELECT v1.emp_id, sum(v1.global_productivity) as global_productivity, v1.emp_name,v1.emp_lastname, v1.line_id, v1.line_label \n' +
            'FROM (SELECT vgpe.line_id, vgpe.line_label, vgpe.emp_name, vgpe.emp_lastname, vgpe.day_session, vgpe.global_productivity ,vgpe.emp_id \n' +
            'FROM views_global_productivity_employee as vgpe\n' +
            'WHERE vgpe.day_session BETWEEN ' + '\'' + state_date + '\'' + 'AND ' + '\'' + end_date + '\'' + 'and vgpe.line_id =' + line_id + ' \n' +
            'GROUP BY vgpe.line_id, vgpe.line_label, vgpe.emp_name, vgpe.emp_lastname, vgpe.day_session, vgpe.global_productivity ,vgpe.emp_id) as v1\n' +
            'GROUP BY v1.emp_id,  v1.emp_name, v1.emp_lastname, v1.line_id, v1.line_label';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })}

    }

    produce_quantity_stat_by_line(req, res, next) {
        let db = require('../models');
        let line_id = req.query.line_id;

        if (line_id === null || line_id === undefined || line_id === 'all') {
            let sql = ' select v1.*, l.line_label from views_produce_quantity_by_line v1\n' +
                ' left join lines l on l.line_id = v1.line_id';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        } else {

            let sql = ' select v1.*, l.line_label from views_produce_quantity_by_line v1\n' +
                ' left join lines l on l.line_id = v1.line_id \n' +
                'where v1.line_id = ' + Number(line_id);

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }


    }


    bundleOperetations(cpo, state_date, bundleInfo) {
        let _this = this
        return new Promise(function (resolve, reject) {
            let k = 0
            if (cpo.length === 0 ) {
                resolve(bundleInfo)
            }
            cpo.forEach(cpo_item => {
                let sql1 = 'select vps.*  from views_cps_data vps \n' +
                    'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                    'where date_operation= \'' + state_date + '\' and cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + '  and cpo.bundle_id =  ' + cpo_item.bundle_id
                _this.db.sequelize.query(sql1,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(bundle_result => {
                        var quantity = 0
                        var reparation = 0
                        var operation = {
                            cpo_id: cpo_item.cart_pending_operation_id,
                            reparation: 0,
                            quantity: 0
                        }
                        if (bundle_result && bundle_result[0]) {
                            operation.quantity = bundle_result[0].quantity
                            reparation = bundle_result[0].reparation
                            quantity = bundle_result[0].quantity
                        }
                        bundleInfo.operations.push(operation)
                        bundleInfo.op_quantity.push(quantity)
                        bundleInfo.op_reparation.push(reparation)

                        if (k === cpo.length -1 ) {

                            resolve(bundleInfo)
                        }
                        k++
                    })

            })
        })
    }

    produce_quantity_stat_by_day(req, res, next) {
        let state_date = req.query.state_date
        let searchBy = req.query.searchBy
        let _this = this
        if (state_date == null || state_date === undefined) {
            res.send({
                data: null,
                message: 'Date is not provided'
            })
        }

        if (searchBy == null || searchBy === undefined) {
            searchBy = 'day'
        }
        var bundles = []
        if (searchBy === 'day') {


            let sqlBundle = 'SELECT \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte \n' +
                'FROM views_cps_data as vcpsd\n' +
                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
                'GROUP BY vcpsd.date_operation, \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte'

            _this.db.sequelize.query(sqlBundle,
                {type: _this.db.sequelize.QueryTypes.SELECT})
                .then(allBundles => {

                    if (allBundles && allBundles.length > 0) {
                        var promise1 = new Promise(function (resolve, reject) {
                            let i = 0
                            allBundles.forEach(bundle => {
                                var bundleInfo = {
                                    bundle_id: bundle.bundle_id,
                                    quantity: bundle.bundle_qte,
                                    operations: [],
                                    op_quantity: [],
                                    op_reparation: [],
                                    not_started: 0,
                                    total_qte: 0
                                }
                                let sql = 'select * \n' +
                                    'from bundles b\n' +
                                    'left join operations op on op.bundle_id = b.bundle_id\n' +
                                    'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                    'where b.bundle_id = ' + bundle.bundle_id
                                _this.db.sequelize.query(sql,
                                    {type: _this.db.sequelize.QueryTypes.SELECT})
                                    .then(cpo => {
                                        _this.bundleOperetations(cpo, state_date, bundleInfo).then(bundle_result => {

                                            bundles.push(bundle_result)

                                            if (bundles.length === allBundles.length) {
                                                resolve(bundles)
                                            }
                                            i++
                                        })

                                        })

                                    })


                        })
                        Promise.all([promise1]).then(function (bundles_result) {

                            let quantity_bundles = bundles_result[0]
                            var promise3 = new Promise(function (resolve, reject) {

                                let i = 0
                                quantity_bundles.forEach(bundle_item => {

                                    bundle_item.finished = Math.min.apply(null, bundle_item.op_quantity)
                                    bundle_item.in_progress = Math.max.apply(null, bundle_item.op_quantity) - bundle_item.finished
                                    bundle_item.not_started = Number(bundle_item.quantity) - (bundle_item.finished + bundle_item.in_progress)
                                    bundle_item.reparation = Math.min.apply(null, bundle_item.op_reparation)

                                    if (i === quantity_bundles.length -1 ) {
                                        resolve(quantity_bundles)
                                    }
                                    i++
                                })
                            })
                            Promise.all([promise3]).then(function (quantity_bundles) {
                                var resultData = {
                                    in_progress: 0,
                                    not_started: 0,
                                    finished: 0,
                                    reparation: 0,
                                    total_qte: 0
                                }
                                var promise4 = new Promise(function (resolve, reject) {
                                    let j = 0
                                    quantity_bundles[0].forEach(bundle_item => {
                                        resultData.finished = Number(resultData.finished) + Number(bundle_item.finished)
                                        resultData.in_progress = Number(resultData.in_progress) + Number(bundle_item.in_progress)
                                        resultData.not_started = Number(resultData.not_started) + Number(bundle_item.not_started)
                                        resultData.reparation = Number(resultData.reparation) + Number(bundle_item.reparation)
                                        resultData.total_qte = Number(resultData.total_qte) + Number(bundle_item.quantity)

                                        if (j === quantity_bundles[0].length -1) {
                                            resolve(resultData)
                                        }
                                        j++
                                    })
                                })
                                Promise.all([promise4]).then(function (resultData) {
                                    res.send({
                                        success: true,
                                        data: resultData,
                                        bundles: quantity_bundles[0]
                                    });
                                    return;
                                })
                            })
                        })
                    } else {

                        res.send({
                            data: [],
                            success: true
                        })

                    }

                })
        } else {

            let start_date = state_date
            let end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')

            _this.global_produce_quantity_by_week(start_date, end_date).then(result_data => {
                res.send(result_data)
            })
        }

    }

    bundleOperationsWeek(cpo, start_date, end_date, bundleInfo) {
        var _this = this
       return new Promise(function (resolve, reject) {
           let k = 0

           if (cpo.length === 0 ){
               resolve(bundleInfo)
           }
            cpo.forEach(cpo_item => {
                let sql1 = 'select vps.*  from views_cps_data vps \n' +
                    'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                    'where  cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + '  and cpo.bundle_id =  ' + cpo_item.bundle_id + '\n' +
                    'and date_operation BETWEEN ' + "'" + start_date + "'" + ' AND ' + "'" + end_date + "'"
                _this.db.sequelize.query(sql1,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(bundle_result => {
                        let quantity = 0
                        let reparation = 0
                        let operation = {
                            cpo_id: cpo_item.cart_pending_operation_id,
                            reparation: 0,
                            quantity: 0
                        }
                        if (bundle_result && bundle_result[0]) {
                            operation.quantity = bundle_result[0].quantity
                            reparation = bundle_result[0].reparation
                            quantity = bundle_result[0].quantity
                        }

                        bundleInfo.operations.push(operation)
                        bundleInfo.op_quantity.push(quantity)
                        bundleInfo.op_reparation.push(reparation)

                        if (k === cpo.length -1 ) {

                            resolve(bundleInfo)
                        }
                        k++

                    })

            })
        })
    }

    global_produce_quantity_by_week(start_date, end_date) {
        let _this = this
        var bundles = []
        return new Promise(function (resolve, reject) {

            let sqlBundle = 'SELECT \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte\n' +
                'FROM views_cps_data as vcpsd\n' +
                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                'WHERE vcpsd.date_operation between \'' + start_date + '\' and \'' + end_date + '\'  \n' +
                'GROUP BY vcpsd.date_operation, \n' +
                'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte'
            _this.db.sequelize.query(sqlBundle,
                {type: _this.db.sequelize.QueryTypes.SELECT})
                .then(allBundles => {
                    if (allBundles && allBundles.length > 0) {


                        var promise1 = new Promise(function (resolve, reject) {
                            let i = 0
                            allBundles.forEach(bundle => {
                                let bundleInfo = {
                                    bundle_id: bundle.bundle_id,
                                    quantity: bundle.bundle_qte,
                                    operations: [],
                                    op_quantity: [],
                                    op_reparation: [],
                                    not_started: 0
                                }
                                let sql = 'select * \n' +
                                    'from bundles b\n' +
                                    'left join operations op on op.bundle_id = b.bundle_id\n' +
                                    'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                    'where b.bundle_id = ' + bundle.bundle_id
                                _this.db.sequelize.query(sql,
                                    {type: _this.db.sequelize.QueryTypes.SELECT})
                                    .then(cpo => {

                                        _this.bundleOperationsWeek(cpo, start_date, end_date, bundleInfo).then(bundle_result => {

                                            bundles.push(bundle_result)

                                            if (bundles.length === allBundles.length) {
                                                resolve(bundles)
                                            }
                                            i++
                                        })
                                    })
                            })
                        })
                    } else {
                        resolve({
                            success: true,
                            data: [],
                            bundles: []
                        });
                    }
                    Promise.all([promise1]).then(function (bundles_result) {
                        let quantity_bundles = bundles_result[0]
                        var promise3 = new Promise(function (resolve, reject) {
                            if (quantity_bundles && quantity_bundles.length > 0) {
                                let i = 0
                                quantity_bundles.forEach(bundle_item => {

                                    bundle_item.finished = Math.min.apply(null, bundle_item.op_quantity)
                                    bundle_item.in_progress = Math.max.apply(null, bundle_item.op_quantity) - bundle_item.finished
                                    bundle_item.not_started = Number(bundle_item.quantity) - (bundle_item.finished + bundle_item.in_progress)
                                    bundle_item.reparation = Math.min.apply(null, bundle_item.op_reparation)

                                    console.log(i, quantity_bundles.length)
                                    if (i === quantity_bundles.length -1 ) {
                                        resolve(quantity_bundles)
                                    }
                                    i++
                                })
                            }
                        })
                        Promise.all([promise3]).then(function (quantity_bundles) {
                            let resultData = {
                                in_progress: 0,
                                not_started: 0,
                                finished: 0,
                                reparation: 0,
                                total_qte: 0
                            }
                            var promise4 = new Promise(function (resolve, reject) {
                                if (quantity_bundles[0] && quantity_bundles[0].length > 0) {
                                    let j = 0
                                    quantity_bundles[0].forEach(bundle_item => {
                                        resultData.finished = resultData.finished + bundle_item.finished
                                        resultData.in_progress = resultData.in_progress + bundle_item.in_progress
                                        resultData.not_started = resultData.not_started + bundle_item.not_started
                                        resultData.reparation = resultData.reparation + bundle_item.reparation
                                        resultData.total_qte = resultData.total_qte + bundle_item.quantity

                                        if (j=== quantity_bundles[0].length -1 ){
                                            resolve(resultData)
                                        }
                                        j++
                                    })
                                }
                            })
                            Promise.all([promise4]).then(function (resultData) {
                                resolve({
                                    success: true,
                                    data: resultData,
                                    bundles: quantity_bundles[0]
                                });
                                return;
                            })
                        })
                    })
                })
        })
    }

    cpsByDate(cpo, state_date, line)  {
        let _this = this
        return new Promise(function (resolve, reject) {

            if (cpo.length === 0 ) {
                resolve(line)
            }
            let i = 0
            cpo.forEach(cpo_item => {
                let quantity = 0
                let reparation = 0
                let operation = {
                    cpo_id: cpo_item.cart_pending_operation_id,
                    reparation: 0,
                    quantity: 0
                }
                let sqlCPS = 'select vps.*  from views_cps_data vps \n' +
                    'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                    'where date_operation= \'' + state_date + '\' and cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + '  and cpo.bundle_id =  ' + cpo_item.bundle_id
                _this.db.sequelize.query(sqlCPS,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(cps_result => {
                        if (cps_result && cps_result[0]) {
                            operation.quantity = cps_result[0].quantity
                            reparation = cps_result[0].reparation
                            quantity = cps_result[0].quantity
                        }
                        line.operations.push(operation)
                        line.op_quantity.push(quantity)
                        line.op_reparation.push(reparation)

                        if (i === cpo.length -1 ) {
                            resolve(line)
                        }
                        i++
                    })
                //setTimeout(resolve, 1000, line);
            })
        })
    }


    produce_quantity_stat_by_line_by_day(req, res, next) {
        let line_id = req.query.line_id;
        let state_date = req.query.state_date
        let searchBy = req.query.searchBy
        let _this = this
        var data = []

        if (searchBy === 'day') {

            if (line_id === null || line_id === undefined || line_id === 'all')
            {



                let sqlBundles = 'SELECT \n' +
                    'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte\n' +
                    'FROM views_cps_data as vcpsd\n' +
                    'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                    'left join operations op on op.operation_id= cpo.operation_id\n' +
                    'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                    'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
                    'GROUP BY vcpsd.date_operation, \n' +
                    'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte';

                _this.db.sequelize.query(sqlBundles,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(bundles => {


                        if (bundles && bundles.length) {
                            var promise1 = new Promise(function (resolve, reject) {
                                let j = 0
                                bundles.forEach(bundle_item => {
                                    let bundle = {
                                        bundle_id: bundle_item.bundle_id,
                                        bundle_qte: bundle_item.bundle_qte,
                                        lines: []
                                    }
                                    let sql = 'select op.line_id , l.line_label from bundles b\n' +
                                        'left join operations op on op.bundle_id = b.bundle_id\n' +
                                        'left join lines l on op.line_id = l.line_id\n' +
                                        'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                        'where b.bundle_id = ' + bundle_item.bundle_id + '\n' +
                                        'group by op.line_id,  l.line_label\n'
                                    _this.db.sequelize.query(sql,
                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                        .then(lines => {
                                            var promise2 = new Promise(function (resolve, reject) {
                                                if (lines.length === 0 ) {
                                                    resolve(bundles)
                                                }
                                                let i = 0
                                                lines.forEach(line_item => {
                                                    let line = {
                                                        line_id: line_item.line_id,
                                                        label: line_item.line_label,
                                                        operations: [],
                                                        op_quantity: [],
                                                        op_reparation: [],
                                                        not_started: 0
                                                    }

                                                    let sqlOp = 'select cpo.* from bundles b\n' +
                                                        'left join operations op on op.bundle_id = b.bundle_id\n' +
                                                        'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                                        'where b.bundle_id = ' + bundle_item.bundle_id + ' and op.line_id = ' + line_item.line_id
                                                    _this.db.sequelize.query(sqlOp,
                                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                                        .then(cpo => {

                                                            _this.cpsByDate(cpo, state_date, line).then(line_result => {

                                                                line.finished = Math.min.apply(0, line.op_quantity)
                                                                line.in_progress = Math.max.apply(0, line.op_quantity) - line.finished
                                                                line.not_started = Number(bundle_item.bundle_qte) - (Number(line.finished) + Number(line.in_progress))
                                                                line.reparation = Math.min.apply(0, line.op_reparation)

                                                                bundle.lines.push(line)

                                                            })
                                                        })

                                                    if (i === lines.length -1 ) {
                                                        resolve(bundle)
                                                    }
                                                    i++
                                                })
                                            })
                                            Promise.all([promise2]).then(function (lineResult) {
                                                data.push(lineResult[0])
                                            })
                                        })
                                    if (j === bundles.length -1 ) {
                                        resolve(data)
                                    }
                                    j++
                                })
                            })
                            Promise.all([promise1]).then(function (quantity_bundles) {
                                let bundles = quantity_bundles[0]
                                let resultData = []

                                let sqlLine = 'SELECT vcpsd.line_id, l.line_label\n' +
                                    'FROM views_cps_data as vcpsd\n' +
                                    'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                                    'left join lines l on l.line_id = vcpsd.line_id\n' +
                                    'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                                    'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
                                    'GROUP BY vcpsd.line_id,  l.line_label'
                                _this.db.sequelize.query(sqlLine,
                                    {type: _this.db.sequelize.QueryTypes.SELECT})
                                    .then(lines => {
                                        var promise5 = new Promise(function (resolve, reject) {
                                            lines.forEach(line_item => {
                                                let line = {
                                                    line_id: line_item.line_id,
                                                    line_label: line_item.line_label,
                                                    in_progress: 0,
                                                    not_started: 0,
                                                    finished: 0,
                                                    reparation: 0,
                                                    total_qte: 0,
                                                    pourcent: 0
                                                }
                                                resultData.push(line)
                                                setTimeout(resolve, 1000, {data: resultData, bundles: bundles});
                                            })
                                        })
                                        Promise.all([promise5]).then(function (resultData) {
                                            let bundles = resultData[0].bundles
                                            let line_result = resultData[0].data
                                            var promise6 = new Promise(function (resolve, reject) {
                                                let i = 0
                                                line_result.forEach(line_item => {
                                                    var promise7 = new Promise(function (resolve, reject) {
                                                        if (bundles && bundles.length > 0) {

                                                            let j = 0
                                                            bundles.forEach(bundle_item => {
                                                                var promise8 = new Promise(function (resolve, reject) {
                                                                    let k = 0
                                                                    if (bundle_item.lines.length === 0) {
                                                                        resolve(bundle_item)
                                                                    }
                                                                    bundle_item.lines.forEach(bundle_line_item => {
                                                                        if (bundle_line_item.line_id === line_item.line_id) {
                                                                            line_item.in_progress = line_item.in_progress + bundle_line_item.in_progress
                                                                            line_item.finished = line_item.finished + bundle_line_item.finished
                                                                            line_item.reparation = bundle_line_item.reparation
                                                                            line_item.total_qte = line_item.total_qte + bundle_item.bundle_qte
                                                                            line_item.not_started = line_item.total_qte - (line_item.in_progress + line_item.finished)
                                                                        }
                                                                        if (k === bundle_item.lines.length -1 ) {
                                                                            resolve(bundle_item)
                                                                        }
                                                                        k++
                                                                    })
                                                                    //setTimeout(resolve, 1000, bundle_item);
                                                                })

                                                                if (j === bundles.length -1 ) {
                                                                    resolve(bundles)
                                                                }
                                                                j++
                                                            })
                                                        }

                                                    })

                                                    if (i === line_result.length -1) {
                                                        resolve({data: line_result, bundles: bundles})
                                                    }
                                                    i++
                                                })
                                            })
                                            Promise.all([promise6]).then(function (resultData) {


                                                var promise8 = new Promise(function (resolve, reject) {
                                                    let i = 0

                                                    if (resultData[0] && resultData[0].data) {
                                                        resultData[0].data.forEach(item => {
                                                            if (item.finished !== 0 && item.total_qte !== 0) {
                                                                item.pourcent = Number(item.finished) / Number(item.total_qte) * 100

                                                            }
                                                            if (i === resultData[0].data.length -1 ) {
                                                                resolve(resultData[0])
                                                            }
                                                            i++
                                                        })
                                                    } else {
                                                        resolve({data: [], bundles: []})
                                                    }


                                                })

                                                Promise.all([promise8]).then(function (resultData_with_poucent) {
                                                    res.send(resultData_with_poucent[0]);
                                                    return
                                                })

                                            })
                                        })
                                    })
                            })
                        } else {
                            res.send({
                                data : []
                            })
                        }


                    })
            }
            else {

                let sqlLine = 'SELECT vcpsd.line_id, l.line_label \n' +
                    'FROM views_cps_data as vcpsd\n' +
                    'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                    'left join lines l on l.line_id= vcpsd.line_id\n' +
                    'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                    'WHERE vcpsd.date_operation = \'' + state_date + '\' and vcpsd.line_id = ' + line_id + '\n'+
                    'GROUP BY vcpsd.line_id, l.line_label'

                _this.db.sequelize.query(sqlLine,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(line_item => {

                    if (line_item && line_item[0]) {

                        var line = {
                            line_id: line_id,
                            label: line_item[0].line_label,
                            bundles: [],
                            finished: 0,
                            in_progress: 0,
                            reparation: 0,
                            not_started: 0,
                            pourcent: 0,
                            total_qte: 0
                        }
                        let sqlBudnles = 'SELECT \n' +
                            'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            'left join operations op on op.operation_id= cpo.operation_id\n' +
                            'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                            'WHERE vcpsd.date_operation = \'' + state_date + '\'\n' +
                            'and op.line_id = ' + line_id +'\n'+
                            'GROUP BY vcpsd.date_operation, \n' +
                            'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte';

                        _this.db.sequelize.query(sqlBudnles,
                            {type: _this.db.sequelize.QueryTypes.SELECT})
                            .then(allBundles => {
                                if (allBundles && allBundles.length > 0) {
                                    var promise1 = new Promise(function (resolve, reject) {

                                        if (allBundles.length == 0) {
                                            resolve(line)
                                        }
                                        let j = 0
                                        allBundles.forEach(bundle_item => {
                                            let bundleInfo = {
                                                bundle_id: bundle_item.bundle_id,
                                                bundle_qte: bundle_item.bundle_qte,
                                                operations: [],
                                                op_quantity: [],
                                                op_reparation: [],
                                                finished: 0,
                                                in_progress: 0,
                                                reparation: 0,
                                                not_started: 0
                                            }
                                            let sqlCPO = 'select cpo.* from bundles b\n' +
                                                'left join operations op on op.bundle_id = b.bundle_id\n' +
                                                'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                                ' where  op.line_id = ' + line_id + ' and b.bundle_id =  ' + bundle_item.bundle_id
                                            _this.db.sequelize.query(sqlCPO,
                                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                                .then(cpo => {


                                                    var promise3 = new Promise(function (resolve, reject) {

                                                        let i = 0

                                                        if (cpo.length === 0 ) {
                                                            resolve(bundleInfo)
                                                        }
                                                        cpo.forEach(cpo_item => {
                                                            let quantity = 0
                                                            let reparation = 0
                                                            let operation = {
                                                                cpo_id: cpo_item.cart_pending_operation_id,
                                                                reparation: 0,
                                                                quantity: 0

                                                            }
                                                            let sqlCPS = 'select vps.*  from views_cps_data vps \n' +
                                                                'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                                                                'where date_operation= \'' + state_date + '\' and cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + '  and cpo.bundle_id =  ' + cpo_item.bundle_id
                                                            _this.db.sequelize.query(sqlCPS,
                                                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                                                .then(cps_result => {
                                                                    if (cps_result && cps_result[0]) {
                                                                        console.log('cpossss', cps_result.length)
                                                                        operation.quantity = cps_result[0].quantity
                                                                        reparation = cps_result[0].reparation
                                                                        quantity = cps_result[0].quantity
                                                                    }
                                                                    bundleInfo.op_quantity.push(quantity)
                                                                    bundleInfo.op_reparation.push(reparation)

                                                                    bundleInfo.operations.push(operation)

                                                                    if (i === cpo.length -1 ) {
                                                                        resolve(bundleInfo)
                                                                    }
                                                                    i++
                                                                })

                                                        })
                                                    })
                                                    Promise.all([promise3]).then(function (bundle_info_result) {
                                                        bundleInfo.finished = Math.min.apply(0, bundle_info_result[0].op_quantity)
                                                        bundleInfo.in_progress = Math.max.apply(0, bundle_info_result[0].op_quantity) - bundleInfo.finished
                                                        bundleInfo.not_started = Number(bundle_item.bundle_qte) - (Number(bundle_info_result[0].finished) + Number(bundleInfo.in_progress))
                                                        bundleInfo.reparation = Math.min.apply(0, bundle_info_result[0].op_reparation)
                                                        bundleInfo.total_qte = Number(bundle_item.bundle_qte)
                                                        line.bundles.push(bundleInfo)

                                                        if (j === allBundles.length -1 ) {
                                                            resolve(line)
                                                        }
                                                        j++
                                                    })
                                                })

                                        })
                                    })

                                    Promise.all([promise1]).then(function (lines) {

                                        let data_result = []
                                        let line = {
                                            line_id: lines[0].line_id,
                                            line_label: lines[0].label,
                                            in_progress: 0,
                                            not_started: 0,
                                            finished: 0,
                                            total_qte: 0,
                                            pourcent: 0,
                                            reparation: 0

                                        }

                                        var promise4 = new Promise(function (resolve, reject) {
                                            if (lines && lines[0] && lines[0].bundles) {
                                                let i = 0
                                                lines[0].bundles.forEach(bundle_item => {
                                                    line.total_qte = line.total_qte + Number(bundle_item.bundle_qte)
                                                    line.finished = line.finished + Number(bundle_item.finished)
                                                    line.in_progress = line.in_progress + Number(bundle_item.in_progress)
                                                    line.not_started = line.not_started + Number(bundle_item.not_started)
                                                    line.pourcent = Number(line.finished) / Number(line.total_qte) * 100
                                                    line.reparation = Number(line.reparation) + Number(bundle_item.reparation)

                                                    if (i === lines[0].bundles.length -1) {
                                                        resolve(line)
                                                    }
                                                    i++

                                                })
                                            } else {
                                                resolve(line)
                                            }

                                        })

                                        Promise.all([promise4]).then(function (bundle_info_result) {
                                            data_result.push(line)

                                            res.send({
                                                success: true,
                                                data: data_result,
                                                line_info: lines[0]
                                            });
                                            return

                                        })


                                    })
                                }
                                else {
                                    res.send({
                                        success: true,
                                        data: [],
                                        line_info: line
                                    })
                                }


                            })
                    } else {
                        res.send({
                            data: [],
                            success: false
                        })
                    }


                })
            }

        } else {


            let start_date = state_date
            let end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')

            if (line_id === null || line_id === undefined || line_id === 'all') {

                let sqlBundles = 'SELECT \n' +
                    'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte\n' +
                    'FROM views_cps_data as vcpsd\n' +
                    'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                    'left join operations op on op.operation_id= cpo.operation_id\n' +
                    'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                    'WHERE vcpsd.date_operation between \''+ start_date + '\' and \'' + end_date + '\'\n' +
                    'GROUP BY vcpsd.date_operation, \n' +
                    'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte';

                _this.db.sequelize.query(sqlBundles,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(bundles => {


                        if (bundles && bundles.length) {

                            var promise1 = new Promise(function (resolve, reject) {

                                let k = 0
                                bundles.forEach(bundle_item => {
                                    let bundle = {
                                        bundle_id: bundle_item.bundle_id,
                                        bundle_qte: bundle_item.bundle_qte,
                                        lines: []
                                    }
                                    let sql = 'select op.line_id , l.line_label from bundles b\n' +
                                        'left join operations op on op.bundle_id = b.bundle_id\n' +
                                        'left join lines l on op.line_id = l.line_id\n' +
                                        'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                        'where b.bundle_id = ' + bundle_item.bundle_id + '\n' +
                                        'group by op.line_id,  l.line_label\n'
                                    _this.db.sequelize.query(sql,
                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                        .then(lines => {
                                            var promise2 = new Promise(function (resolve, reject) {

                                                if (lines.length === 0) {
                                                    resolve(bundle)
                                                }
                                                let j = 0
                                                lines.forEach(line_item => {
                                                    let line = {
                                                        line_id: line_item.line_id,
                                                        label: line_item.line_label,
                                                        operations: [],
                                                        op_quantity: [],
                                                        op_reparation: [],
                                                        not_started: 0
                                                    }

                                                    let sqlOp = 'select cpo.* from bundles b\n' +
                                                        'left join operations op on op.bundle_id = b.bundle_id\n' +
                                                        'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                                        'where b.bundle_id = ' + bundle_item.bundle_id + ' and op.line_id = ' + line_item.line_id
                                                    _this.db.sequelize.query(sqlOp,
                                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                                        .then(cpo => {

                                                            console.log('cpoooo', cpo.length)
                                                            var promise3 = new Promise(function (resolve, reject) {
                                                                if (cpo.length === 0) {
                                                                    resolve(line)
                                                                }
                                                                let i = 0
                                                                cpo.forEach(cpo_item => {
                                                                    let quantity = 0
                                                                    let reparation = 0
                                                                    let operation = {
                                                                        cpo_id: cpo_item.cart_pending_operation_id,
                                                                        reparation: 0,
                                                                        quantity: 0
                                                                    }
                                                                    let sqlCPS = 'select vps.*  from views_cps_data vps \n' +
                                                                        'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                                                                        'where date_operation between ' + "'" + start_date + "'" + ' and ' + "'" + end_date + "'" + ' and cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + ' and cpo.bundle_id =  ' + cpo_item.bundle_id
                                                                    _this.db.sequelize.query(sqlCPS,
                                                                        {type: _this.db.sequelize.QueryTypes.SELECT})
                                                                        .then(cps_result => {
                                                                            if (cps_result && cps_result[0]) {
                                                                                operation.quantity = cps_result[0].quantity
                                                                                reparation = cps_result[0].reparation
                                                                                quantity = cps_result[0].quantity
                                                                            }
                                                                            line.operations.push(operation)
                                                                            line.op_quantity.push(quantity)
                                                                            line.op_reparation.push(reparation)

                                                                            if (i === cpo.length - 1) {
                                                                                resolve(line)
                                                                            }
                                                                            i++
                                                                        })
                                                                })
                                                            })
                                                            Promise.all([promise3]).then(function (line_result) {
                                                                line.finished = Math.min.apply(0, line.op_quantity)
                                                                line.in_progress = Math.max.apply(0, line.op_quantity) - line.finished
                                                                line.not_started = Number(bundle_item.bundle_qte) - (Number(line.finished) + Number(line.in_progress))

                                                                line.reparation = Math.min.apply(0, line.op_reparation)

                                                                bundle.lines.push(line)
                                                                if (j === lines.length - 1) {
                                                                    resolve(bundle)
                                                                }
                                                                j++
                                                            })
                                                        })

                                                })
                                            })
                                            Promise.all([promise2]).then(function (lineResult) {
                                                data.push(lineResult[0])
                                                if (k === bundles.length - 1) {
                                                    resolve(data)
                                                }
                                                k++
                                            })
                                        })
                                })
                            })
                        Promise.all([promise1]).then(function (quantity_bundles) {
                            let bundles = quantity_bundles[0]
                            let resultData = []

                            let sqlLines = 'SELECT vcpsd.line_id, l.line_label \n' +
                                'FROM views_cps_data as vcpsd \n' +
                                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                                'left join lines l on l.line_id = vcpsd.line_id \n' +
                                'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id \n' +
                                'WHERE vcpsd.date_operation between \'' + start_date + '\' and \'' + end_date + '\'\n' +
                                'GROUP BY vcpsd.line_id,  l.line_label'
                            _this.db.sequelize.query(sqlLines,
                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                .then(lines => {
                                    var promise5 = new Promise(function (resolve, reject) {
                                        lines.forEach(line_item => {
                                            let line = {
                                                line_id: line_item.line_id,
                                                line_label: line_item.line_label,
                                                in_progress: 0,
                                                not_started: 0,
                                                finished: 0,
                                                reparation: 0,
                                                total_qte: 0,
                                                pourcent: 0
                                            }
                                            resultData.push(line)
                                            setTimeout(resolve, 100, {data: resultData, bundles: bundles});
                                        })
                                    })
                                    Promise.all([promise5]).then(function (resultData) {
                                        let bundles = resultData[0].bundles
                                        let line_result = resultData[0].data
                                        var promise6 = new Promise(function (resolve, reject) {
                                            let j = 0
                                            line_result.forEach(line_item => {
                                                var promise7 = new Promise(function (resolve, reject) {
                                                    if (bundles && bundles.length > 0) {
                                                        bundles.forEach(bundle_item => {
                                                            var promise8 = new Promise(function (resolve, reject) {
                                                                if (bundle_item.lines.length === 0) {
                                                                    resolve(bundle_item)
                                                                }
                                                                let i = 0
                                                                bundle_item.lines.forEach(bundle_line_item => {
                                                                    if (bundle_line_item.line_id === line_item.line_id) {
                                                                        line_item.in_progress = line_item.in_progress + bundle_line_item.in_progress
                                                                        line_item.finished = line_item.finished + bundle_line_item.finished
                                                                        line_item.reparation = bundle_line_item.reparation
                                                                        line_item.total_qte = line_item.total_qte + bundle_item.bundle_qte
                                                                        line_item.not_started = line_item.total_qte - (line_item.in_progress + line_item.finished)
                                                                    }

                                                                    if (i === bundle_item.lines.length - 1) {
                                                                        resolve(bundle_item)
                                                                    }
                                                                    i++
                                                                })
                                                            })

                                                        })
                                                    }

                                                })
                                                if (j === line_result.length - 1) {
                                                    resolve({data: line_result, bundles: bundles})
                                                }
                                                j++
                                            })
                                        })
                                        Promise.all([promise6]).then(function (resultData) {
                                            var promise8 = new Promise(function (resolve, reject) {
                                                let data = []
                                                let i = 0
                                                resultData[0].data.forEach(item => {
                                                    if (item.finished !== 0 && item.total_qte !== 0) {
                                                        item.pourcent = Number(item.finished) / Number(item.total_qte) * 100
                                                    }
                                                    if (i === resultData[0].data.length - 1) {
                                                        resolve(resultData[0])
                                                    }
                                                    i++
                                                })
                                            })
                                            Promise.all([promise8]).then(function (resultData_with_poucent) {
                                                res.send(resultData_with_poucent[0]);
                                                return
                                            })

                                        })
                                    })
                                })
                        })

                    } else{
                            res.send({data: []})
                        }
                    })
            } else {

                let sqlLine = 'SELECT vcpsd.line_id, l.line_label\n' +
                    'FROM views_cps_data as vcpsd\n' +
                    'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                    'left join lines l on l.line_id= vcpsd.line_id\n' +
                    'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                    'WHERE vcpsd.date_operation between \'' + start_date + '\' and \''+ end_date + '\' and vcpsd.line_id = ' + line_id + '\n' +
                    'GROUP BY vcpsd.line_id, l.line_label'

                _this.db.sequelize.query(sqlLine,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(line_item => {

                    if (line_item && line_item[0]) {

                        let line = {
                            line_id: line_id,
                            label: line_item[0].line_label,
                            bundles: [],
                            finished: 0,
                            in_progress: 0,
                            reparation: 0,
                            not_started: 0,
                            pourcent: 0,
                            total_qte: 0
                        }

                        let sqlBudnles = 'SELECT \n' +
                            'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte\n' +
                            'FROM views_cps_data as vcpsd\n' +
                            'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = vcpsd.cart_pendingoperation_id and cpo.active = \'Y\'\n' +
                            'left join operations op on op.operation_id= cpo.operation_id\n' +
                            'LEFT JOIN bundles b on b.bundle_id =cpo.bundle_id\n' +
                            'WHERE vcpsd.date_operation between \''+ start_date +'\' and \''+ end_date + '\' \n' +
                            'and op.line_id = '+ line_id + '\n' +
                            'GROUP BY vcpsd.date_operation, \n' +
                            'cpo.bundle_id, b.code_bundle, b.num_bundle, b.bundle_qte'
                        _this.db.sequelize.query(sqlBudnles,
                            {type: _this.db.sequelize.QueryTypes.SELECT})
                            .then(allBundles => {

                                if (allBundles && allBundles.length > 0) {
                                    var promise1 = new Promise(function (resolve, reject) {
                                        let j = 0
                                        allBundles.forEach(bundle_item => {
                                            let bundleInfo = {
                                                bundle_id: bundle_item.bundle_id,
                                                bundle_qte: bundle_item.bundle_qte,
                                                operations: [],
                                                op_quantity: [],
                                                op_reparation: [],
                                                finished: 0,
                                                in_progress: 0,
                                                reparation: 0,
                                                not_started: 0
                                            }
                                            let sqlCPO = 'select cpo.* from bundles b\n' +
                                                'left join operations op on op.bundle_id = b.bundle_id\n' +
                                                'left join cart_pending_operations cpo on cpo.operation_id = op.operation_id \n' +
                                                ' where  op.line_id = ' + line_id + ' and b.bundle_id =  ' + bundle_item.bundle_id
                                            _this.db.sequelize.query(sqlCPO,
                                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                                .then(cpo => {


                                                    var promise3 = new Promise(function (resolve, reject) {
                                                        if (cpo.length === 0 ) {
                                                            resolve(bundleInfo)
                                                        }
                                                        let i = 0
                                                        cpo.forEach(cpo_item => {
                                                            let quantity = 0
                                                            let reparation = 0
                                                            let operation = {
                                                                cpo_id: cpo_item.cart_pending_operation_id,
                                                                reparation: 0,
                                                                quantity: 0

                                                            }
                                                            let sqlCPS = 'select vps.*  from views_cps_data vps \n' +
                                                                'left join cart_pending_operations cpo on cpo.cart_pending_operation_id = vps.cart_pendingoperation_id\n' +
                                                                'where date_operation between ' + "'"+ start_date+ "'" + ' and '+ "'" + end_date + "'" +' and cart_pendingoperation_id= ' + cpo_item.cart_pending_operation_id + ' and cpo.bundle_id =  '+cpo_item.bundle_id
                                                           _this.db.sequelize.query(sqlCPS,
                                                                {type: _this.db.sequelize.QueryTypes.SELECT})
                                                                .then(cps_result => {
                                                                    if (cps_result && cps_result[0]) {
                                                                        operation.quantity = cps_result[0].quantity
                                                                        reparation = cps_result[0].reparation
                                                                        quantity = cps_result[0].quantity
                                                                    }
                                                                    bundleInfo.op_quantity.push(quantity)
                                                                    bundleInfo.op_reparation.push(reparation)
                                                                    bundleInfo.operations.push(operation)

                                                                    if (i === cpo.length -1) {
                                                                        resolve(bundleInfo)
                                                                    }
                                                                    i++
                                                                })
                                                        })
                                                    })
                                                    Promise.all([promise3]).then(function (bundle_info_result) {
                                                        bundleInfo.finished = Math.min.apply(0, bundle_info_result[0].op_quantity)
                                                        bundleInfo.in_progress = Math.max.apply(0, bundle_info_result[0].op_quantity) - bundleInfo.finished
                                                        bundleInfo.not_started = Number(bundle_item.bundle_qte) - (Number(bundle_info_result[0].finished) + Number(bundleInfo.in_progress))
                                                        bundleInfo.reparation = Math.min.apply(0, bundle_info_result[0].op_reparation)
                                                        bundleInfo.total_qte = Number(bundle_item.bundle_qte)
                                                        line.bundles.push(bundleInfo)
                                                        if (j === allBundles.length -1) {
                                                            resolve(line)
                                                        }
                                                        j++
                                                    })
                                                })

                                        })
                                    })

                                    Promise.all([promise1]).then(function (lines) {
                                        let data_result = []
                                        let line = {
                                            line_id: lines[0].line_id,
                                            line_label: lines[0].label,
                                            in_progress: 0,
                                            not_started: 0,
                                            finished: 0,
                                            total_qte: 0,
                                            pourcent: 0,
                                            reparation: 0

                                        }

                                        var promise4 = new Promise(function (resolve, reject) {
                                            if (lines[0].bundles.length === 0) {
                                                resolve(line)
                                            }
                                            let i = 0
                                            lines[0].bundles.forEach(bundle_item => {
                                                line.total_qte = line.total_qte + Number(bundle_item.bundle_qte)
                                                line.finished = line.finished + Number(bundle_item.finished)
                                                line.in_progress = line.in_progress + Number(bundle_item.in_progress)
                                                line.not_started = line.not_started + Number(bundle_item.not_started)
                                                line.pourcent = Number(line.finished) / Number(line.total_qte) * 100
                                                line.reparation = Number(line.reparation) + Number(bundle_item.reparation)
                                                if (i === lines[0].bundles.length -1 ) {
                                                    resolve(line)
                                                }
                                                i++
                                            })
                                        })

                                        Promise.all([promise4]).then(function (bundle_info_result) {
                                            data_result.push(line)

                                            res.send({
                                                success: true,
                                                data: data_result,
                                                line_info: lines[0]
                                            });
                                            return

                                        })


                                    })
                                } else {
                                    res.send({
                                        success: true,
                                        data: [
                                            {
                                                line_id: line_id,
                                                line_label: line_item.line_label,
                                                bundles: [],
                                                finished: 0,
                                                in_progress: 0,
                                                reparation: 0,
                                                not_started: 0,
                                                pourcent: 0,
                                                total_qte: 0
                                            }],
                                        line_info: line
                                    })
                                }


                            })
                    } else {
                        res.send({
                            data: [],
                            success: false
                        })
                    }


                })

            }

        }


    }

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      -------------------------------------------------------------------------- API : Get_productivity_by_hour -----------------------------------------------------------------------------------------
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


    global_productivity_by_hour(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        let _this = this
           let sql = 'SELECT V1.date_hour_operation , CASE WHEN SUM (V1.global_productivity)/count(V1.date_hour_operation ) IS NOT NULL THEN  SUM (V1.global_productivity)/count(V1.date_hour_operation ) else 0 END  as global_productivity\n' +
               '                FROM\n' +
               '                (SELECT l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id, vcd.date_hour_operation, \n' +
               '                SUM(vesdhl.productivity)/count(vesdhl.*) as global_productivity\n' +
               '                FROM views_employee_stats_by_day_hour_line as vesdhl\n' +
               '                LEFT JOIN lines l ON l.line_id = vesdhl.line_id\n' +
               '                LEFT JOIN employees as e on e.emp_id = vesdhl.employee_id\n' +
               '                LEFT JOIN views_cps_data as vcd on vcd.employee_id = e.emp_id\n' +
               '                WHERE vcd.date_operation =  \'' + state_date + '\'\n' +
               '                GROUP BY l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id, vcd.date_hour_operation)AS V1\n' +
               '                GROUP BY V1.date_hour_operation'

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(operatorProductivity => {
                    if (operatorProductivity) {

                        let operator = []

                        _this.hoursDay(18).then(hours => {

                            _this.resetHours(hours, operator).then(productivityDay=> {

                                var promise1= new Promise(function (resolve, reject) {
                                    let i = 0;

                                    if (productivityDay) {
                                        productivityDay.forEach(item=> {

                                            var promise2 = new Promise(function (resolve, reject) {
                                                 let j = 0;
                                                operatorProductivity.forEach(operator_productivity => {

                                                    if (item.HH === operator_productivity.date_hour_operation.substr(8,2)) {
                                                        item.productivity = operator_productivity.global_productivity
                                                    }
                                                    if (j === operatorProductivity.length -1) {
                                                        resolve(productivityDay)
                                                    }
                                                    j++
                                                    // setTimeout(resolve, 100, productivityDay);

                                                })
                                            });
                                            if (i === productivityDay.length -1) {
                                                resolve(productivityDay)
                                            }
                                            i++
                                            // setTimeout(resolve, 100, productivityDay);

                                        })
                                    }


                                })

                                Promise.all([promise1]).then(function (productivityDay) {


                                    res.send({
                                        success: false,
                                        data: productivityDay[0]
                                    })
                                })

                            })

                        })






                    } else {
                        res.send({
                            success: false,
                            data: []
                        })
                    }

                })
    }
    global_productivity_by_hour_line(req, res, next) {
        let db = require('../models');
        let state_date = req.query.state_date;
        let _this = this
        let line_id = req.query.line_id;

        if (line_id === null || line_id === undefined || line_id === 'all') {
            let sql = 'SELECT count(vesd.*) as total_employees, l.line_label,l.line_id,\n' +
                'SUM(vesd.productivity)/count(vesd.*) as global_productivity\n' +
                'FROM views_employee_stats_by_day_hour_line as vesd\n' +
                'LEFT JOIN lines l ON l.line_id = vesd.line_id\n' +
                'WHERE vesd.day_session =  \'' + state_date + '\'\n' +
                'GROUP BY vesd.day_session, l.line_label,l.line_id';

            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(data => {
                    res.send({
                        success: true,
                        data: data
                    })
                })
        }else{

            let sql = 'SELECT V1.date_hour_operation , CASE WHEN SUM (V1.global_productivity)/count(V1.date_hour_operation ) IS NOT NULL THEN  SUM (V1.global_productivity)/count(V1.date_hour_operation ) else 0 END  as global_productivity\n' +
                '                FROM\n' +
                '                (SELECT l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id, vcd.date_hour_operation, \n' +
                '                SUM(vesdhl.productivity)/count(vesdhl.*) as global_productivity\n' +
                '                FROM views_employee_stats_by_day_hour_line as vesdhl\n' +
                '                LEFT JOIN lines l ON l.line_id = vesdhl.line_id\n' +
                '                LEFT JOIN employees as e on e.emp_id = vesdhl.employee_id\n' +
                '                LEFT JOIN views_cps_data as vcd on vcd.employee_id = e.emp_id\n' +
                '                WHERE vcd.date_operation =  \'' + state_date + '\' and vesdhl.line_id = ' + line_id + ' \n' +
                '                GROUP BY l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id, vcd.date_hour_operation)AS V1\n' +
                '                GROUP BY V1.date_hour_operation'
            db.sequelize.query(sql,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(operatorProductivity => {
                    if (operatorProductivity) {

                        let operator = []

                        _this.hoursDay().then(hours => {

                            _this.resetHours(hours, operator).then(productivityDay=> {

                                var promise1= new Promise(function (resolve, reject) {
                                     let i =0;
                                    if (productivityDay) {
                                        productivityDay.forEach(item=> {

                                            var promise2 = new Promise(function (resolve, reject) {
                                               let j = 0;
                                                operatorProductivity.forEach(operator_productivity => {

                                                    if (item.HH === operator_productivity.date_hour_operation.substr(8,2)) {
                                                        item.productivity = operator_productivity.global_productivity
                                                    }
                                                    if (j === operatorProductivity.length -1) {
                                                        resolve(productivityDay)
                                                    }
                                                    j++
                                                    // setTimeout(resolve, 100, productivityDay);

                                                })
                                            })
                                            if (i === productivityDay.length -1) {
                                                resolve(productivityDay)
                                            }
                                            i++
                                            // setTimeout(resolve, 100, productivityDay);

                                        })
                                    }


                                })

                                Promise.all([promise1]).then(function (productivityDay) {


                                    res.send({
                                        success: false,
                                        data: productivityDay[0]
                                    })
                                })

                            })

                        })






                    } else {
                        res.send({
                            success: false,
                            data: []
                        })
                    }

                })
        }


    }


    resetHours(hours, itemOperation) {
        let _this = this
        let i = 0

        return new Promise(function (resolve, reject) {

            hours.forEach(hour => {

                itemOperation.push({
                    HH: hour,
                    productivity: 0,

                })

            })
            resolve(itemOperation);
            return

        })
    }

    hoursDay() {
        let _this = this
        return new Promise(function (resolve, reject) {
            const lastHour = 23
            let hours = []
            for (let i = 0; i < lastHour + 1; i++) {
                let hour = i.toString();
                if (i < 10) {
                    hour = '0' + i;
                }
                hours.push(hour)


            }

            let i = 0
            resolve(hours);
            return
        })
    }



    global_productivity_by_week_by_day(req, res, next) {

        let db = require('../models');

        let state_date = req.query.state_date
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')

        let sql = 'SELECT V1.day_session , sum(V1.global_productivity)/count(V1.*) as global_productivity\n' +
            '                FROM\n' +
            '               (SELECT l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id,vesdhl.day_session,\n' +
            '               SUM(vesdhl.productivity)/count(vesdhl.*) as global_productivity\n' +
            '               FROM views_employee_stats_by_day_hour_line as vesdhl\n' +
            '               LEFT JOIN lines l ON l.line_id = vesdhl.line_id\n' +
            '               LEFT JOIN employees as e on e.emp_id = vesdhl.employee_id\n' +
            '               WHERE vesdhl.day_session BETWEEN ' + '\''+ state_date + '\'' +  'AND ' + '\''+ end_date + '\' \n' +
            '               GROUP BY l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id,vesdhl.day_session) AS V1\n' +
            '               GROUP BY V1.day_session';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }

    global_productivity_by_week_by_day_line(req, res, next) {

        let db = require('../models');
        let line_id = req.query.line_id;

        let state_date = req.query.state_date
        var end_date = moment(state_date, 'YYYYMMDD').add(5, 'days').format('YYYYMMDD')

        let sql = 'SELECT V1.day_session , V1.line_label, sum(V1.global_productivity)/count(V1.*) as global_productivity\n' +
            '                FROM\n' +
            '               (SELECT l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id,vesdhl.day_session,\n' +
            '               SUM(vesdhl.productivity)/count(vesdhl.*) as global_productivity\n' +
            '               FROM views_employee_stats_by_day_hour_line as vesdhl\n' +
            '               LEFT JOIN lines l ON l.line_id = vesdhl.line_id\n' +
            '               LEFT JOIN employees as e on e.emp_id = vesdhl.employee_id\n' +
            '               WHERE vesdhl.day_session BETWEEN ' + '\''+ state_date + '\'' +  'AND ' + '\''+ end_date + '\' and l.line_id = ' + line_id + ' \n' +
            '               GROUP BY l.line_label,l.line_id, e.emp_name, e.emp_lastname,e.emp_id,vesdhl.day_session) AS V1\n' +
            '               GROUP BY V1.day_session, V1.line_label';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })
            })
    }
}

module.exports = UsersessionsDao;

