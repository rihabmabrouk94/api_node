const MtBox_builds = require('../dao/mtbox_buildsDao');
var mtbox_buildsInst = new MtBox_builds();

module.exports =
    {
        update: function (req, res, next) {
            mtbox_buildsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            mtbox_buildsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            mtbox_buildsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            mtbox_buildsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            mtbox_buildsInst.delete(req, res, next);
        },
        findById: function(req, res, next) {
            mtbox_buildsInst.findByEncodeId(req,res , next);
        },
        last_version: function(req, res, next ) {
            mtbox_buildsInst.last_version(req, res, next );
        },
        download_build_by_id : function( req, res, next) {
            mtbox_buildsInst.download_build_by_id(req,res,next);
        },
        box_version : function (req, res, next) {
            mtbox_buildsInst.box_version(req, res, next)
        }
    };
