const {baseModelDao} = require('./baseModalDao');
const db = require('../models');
const EFile = db.efiles;
var path = require('path');
var appDir = path.dirname(require.main.filename);
var fs = require('fs')

class Mtbox_buildsDao extends baseModelDao {
    constructor() {
        super('mtbox_builds', 'mtbox_build_id');
        this.baseModal = 'mtbox_builds';
        this.primaryKey = 'mtbox_build_id';
    }

    last_version(req, res, next) {

        let db = require('../models');

        let sql= 'select * \n' +
            'from mtbox_builds m1 \n' +
            'LEFT JOIN efiles e ON m1.efile_id = e.file_id\n' +
            'where m1.version = (select max(m2.version) from mtbox_builds m2 where m2.active = \'Y\' )';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {


                EFile.findById(data[0].file_id).then(efile => {

                    if (!efile) {
                        return_default_image(res)
                    } else {
                        const file_path = appDir + '/resources/efiles/' + efile.uri;
                        if (fs.existsSync(!path)) {
                            return_default_image(res)
                        } else {
                            res.sendFile(file_path);
                        }
                    }
                })
            })
    }


    download_build_by_id(req, res, next) {

        let db = require('../models');

        let _this = this;
        let mtbox_build_id = req.query.mtbox_build_id;

        _this.db['mtbox_builds'].findOne({
            where :
                {
                    mtbox_build_id: mtbox_build_id
                }
        }).then(mtbox => {

            EFile.findById(mtbox.efile_id).then(efile => {

                if (!efile) {
                    return_default_image(res)
                } else {
                    const file_path = appDir + '/resources/efiles/' + efile.uri;
                    if (fs.existsSync(!path)) {
                        return_default_image(res)
                    } else {

                        res.sendFile(file_path);
                    }
                }
            })
        })
    }


    box_version(req, res, next) {
        let _this= this;
        let box_macaddress = req.params.box_macaddress;
        _this.db['boxes'].findOne({
            where: {
                box_macaddress: box_macaddress,
                active: 'Y'
            }
        }).then(boxes => {
            if(boxes){
                _this.db['mtbox_builds'].findOne({
                    where: {
                        mtbox_build_id: boxes.mtbox_build_id,
                        active: 'Y'
                    }
                }).then(mtbox_builds => {
                    if(mtbox_builds){
                        res.send({
                            success: true,
                            data: mtbox_builds,
                            messages: [
                                {
                                    userMessage: 'Mtbox Builds with success',
                                    internalMessage: 'Mtbox Builds with success',
                                    code: 1044
                                }
                            ]
                        });
                    }else{

                        let db = require('../models');

                        let sql= 'select * \n' +
                            'from mtbox_builds m1 \n' +
                            'where m1.version = (select max(m2.version) from mtbox_builds m2 where m2.active = \'Y\' )';

                        db.sequelize.query(sql,
                            {type: db.sequelize.QueryTypes.SELECT})
                            .then(data => {
                                res.send({
                                    success: true,
                                    data: data,
                                    messages: [
                                        {
                                            userMessage: 'Mtbox Builds with success',
                                            internalMessage: 'Mtbox Builds with success',
                                            code: 1044
                                        }
                                    ]
                                });
                            })
                    }
                })
                }else{
                res.send({
                    success: false,
                    data: null,
                    messages: [
                        {
                            userMessage: 'Box does not exists',
                            internalMessage: 'Box does not exists',
                            code: 1041
                        }
                    ]
                });
            }
        })

    }

}



function return_default_image(res) {
    const default_file_path = appDir + '/resources/efiles/public/upload/efile-532.png';
    res.sendFile(default_file_path);
}
module.exports = Mtbox_buildsDao;
