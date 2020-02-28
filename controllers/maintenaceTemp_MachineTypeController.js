const m_template_m_type = require('../dao/maintenaceTemp_MachineTypeDao');
var m_template_m_typeInst = new m_template_m_type();


module.exports =
    {
        update: function (req, res, next) {
            m_template_m_typeInst.update(req, res, next);
        },
        get: function (req, res, next) {
            m_template_m_typeInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            m_template_m_typeInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            m_template_m_typeInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            m_template_m_typeInst.delete(req, res, next);
        },
        update_MaintenaceTemplate_Machinetype: function (req, res, next) {
            m_template_m_typeInst.update_MaintenaceTemplate_Machinetype(req, res, next);
        },
        get_machine_type_by_id_maintenance: function (req, res, next) {
            m_template_m_typeInst.get_machine_type_by_id_maintenance(req, res, next);
        },
        get_machine_type_Info: function (req, res, next) {
            m_template_m_typeInst.get_machine_type_Info(req, res, next);
        },

    };
