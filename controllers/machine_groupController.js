const MachineGroups = require('../dao/machine_groupDao');
var machine_groupsInst = new MachineGroups();


module.exports =
    {
        update: function (req, res, next) {
            machine_groupsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            machine_groupsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            machine_groupsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            machine_groupsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            machine_groupsInst.delete(req, res, next);
        },
        updateMachineGroup : function(req,res,next) {
            machine_groupsInst.updateMachineGroup(req,res,next);
        }

    };
