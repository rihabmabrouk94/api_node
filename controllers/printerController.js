const Printers = require('../dao/printerDao');
var printersInst = new Printers();
module.exports =
    {
        update: function (req, res, next) {
            printersInst.update(req, res, next);
        },
        get: function (req, res, next) {
            printersInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            printersInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            printersInst.save(req, res, next);
        },
        delete: function (req, res, next) {


            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'printers' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.printer_id) {
                    dbModelItem.count(
                        {
                            where: {
                                printer_id: params.id,
                                active: 'Y'
                            }
                        }
                    ).then(result => {
                        if (result > 0) {
                            countModelsHasSite++;
                            modalArray.push(dbModelItem.getTableName()+ ' ')
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
                    printersInst.delete(req, res, next);
                }
            });
        },
        printCallbackAction:function (req, res, next) {
                printersInst.printCallbackAction(req, res, next);
            },
        readFilePrinter : function(req,res, next) {
            printersInst.readFilePrinter(req, res, next);
           },
        statusPrint: function(req, res, next){
            printersInst.statusPrint(req,res,next)
        },
        printBundle: function (req, res,next) {
            printersInst.printBundle(req, res, next)
        }
    };


