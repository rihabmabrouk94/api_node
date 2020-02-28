const Machines = require('../dao/machineDao');
var machinesInst = new Machines();

module.exports =
    {
        update: function (req, res, next) {
            machinesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            machinesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            machinesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            machinesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'machines' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.machine_id) {
                    dbModelItem.count(
                        {
                            where: {
                                machine_id: params.id,
                                active: 'Y'
                            }
                        }
                    ).then(result => {
                        if (result > 0) {
                            countModelsHasSite++;
                            modalArray.push(dbModelItem.getTableName() + ' ');
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
                        messages: 'Cant delete',
                        models: modalArray
                    })
                } else {
                    machinesInst.delete(req, res, next);
                }
            });
        },
        infoMachineAction: function (req, res, next) {
            machinesInst.infoMachineAction(req, res, next);
        },
        getMachineFailure: function (req, res, next) {
            machinesInst.getMachineFailure(req, res, next);
        },
        getAllbundleBymachineBylines: function (req, res, next) {
            machinesInst.getAllbundleBymachineBylines(req, res, next);
        },
        getallmachinebylinebyallsite: function (req, res, next) {
            machinesInst.getallmachinebylinebyallsite(req, res, next);
        },
        getallbundlemachinebylinebysite: function (req, res, next) {
            machinesInst.getallbundlemachinebylinebysite(req, res, next);
        },
    };
