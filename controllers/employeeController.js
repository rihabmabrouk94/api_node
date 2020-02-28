const Employees = require('../dao/employeeDao');

var employeesInst = new Employees();

var uploadFile = function (req, res, next) {
    employees.uploadFile(req, res, next);
};
module.exports =
    {
        update: function (req, res, next) {
            employeesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            employeesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            employeesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            employeesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'employees' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.emp_id) {
                    dbModelItem.count(
                        {
                            where: {
                                emp_id: params.id,
                                active: 'Y'
                            }
                        }
                    ).then(result => {
                        if (result > 0) {
                            countModelsHasSite++;
                            modalArray.push(dbModelItem.getTableName()+ ' ');
                        }
                        callback()
                    });
                } else {
                    callback()
                }
            }, function (err) {
                if (countModelsHasSite) {
                    res.json({
                        success: false,
                        messages:'Cant delete',
                        models: modalArray
                    })
                } else {
                    employeesInst.delete(req, res, next);
                }
            });
        },
        uploadFile: uploadFile,
        authAction: function(req, res, next) {
            employeesInst.authAction(req, res, next);
        },
        logout: function(req,res,next){
            employeesInst.logout(req, res, next);
        },
        get_operators: function(req, res, next){
            employeesInst.get_operators(req, res, next);
        },
        get_total_employee_and_logged_employee: function( req,res, next) {
            employeesInst.get_total_employee_and_logged_employee(req, res, next);
        },
        get_user_logged_in_current_day: function(req, res, next) {
            employeesInst.get_user_logged_in_current_day(req,res, next);
        },
        find_matricule(req, res, next) {
            employeesInst.find_matricule(req,res, next);
        },
    Add_user_mat(req, res, next ) {
        employeesInst.Add_user_mat(req,res, next);
    },
    update_user_mat(req, res, next ) {
        employeesInst.update_user_mat(req,res, next);
    },


    };
