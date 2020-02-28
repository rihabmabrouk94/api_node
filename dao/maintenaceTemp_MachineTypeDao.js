const {baseModelDao} = require('./baseModalDao');

class MaintenaceTemp_MachineTypeDao extends baseModelDao {
    constructor() {
        super('maintenaceTemp_machineTypes', 'id');
        this.baseModal = 'maintenaceTemp_machineTypes';
        this.primaryKey = 'id';
    }

    update_MaintenaceTemplate_Machinetype(req, res, next) {
        let _this =  this
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['maintenaceTemp_machineTypes'].findAll({
            include: [{
                model: this.db['maintenance_templates'],

            }],
            where: {
                maintenance_template_id: params.maintenance_template_id
            }
        }).then(data => {


            var oldMachinetype = [];

            if (data && data.length!==0) {
                var promise1 = new Promise(function (resolve, reject) {
                    let i = 0
                    data.forEach(item => {
                        oldMachinetype.push(item.machine_type_id);
                        if (i === data.length - 1) {
                            resolve(oldMachinetype)
                        }
                        i++
                    });

                })

                Promise.all([promise1]).then(function (oldMachinetype) {

                    if (params && params.machinestypes.length!== 0) {
                        var promise2 = new Promise(function (resolve, reject) {
                            let i = 0
                        params.machinestypes.forEach(newmachinetype => {

                            if (oldMachinetype.indexOf(newmachinetype) === -1) {
                                console.log('newmachinetype', newmachinetype)
                                var modalObj = _this.db[_this.baseModal].build({
                                    maintenance_template_id: params.maintenance_template_id,
                                    machine_type_id: newmachinetype
                                });
                                modalObj.save().then(result => {

                                });

                            }
                            if (i === params.machinestypes.length - 1) {
                                resolve(modalObj)
                            }
                            i++
                        })})
                        Promise.all([promise2]).then(function (modalObj) {
                        var promise3 = new Promise(function (resolve, reject) {
                            let i = 0
                        oldMachinetype.forEach(oldMachinetypes => {
                            if (params.machinestypes.indexOf(oldMachinetypes) == -1) {

                                _this.db['maintenaceTemp_machineTypes'].destroy(
                                    {
                                        where: {
                                            maintenance_template_id: params.maintenance_template_id,
                                            machine_type_id: oldMachinetypes
                                        }
                                    }).then(res => {
                                })
                            }
                            if (i === oldMachinetype.length - 1) {
                                resolve(modalObj)
                            }
                            i++
                        })})

                            Promise.all([promise3]).then(res1 => {
                                res.send(res1[0])
                            })
                    } )

                    }else {

                        var promise5 = new Promise(function (resolve, reject) {
                            let i = 0
                            oldMachinetype.forEach(oldMachinetypes => {


                                    _this.db['maintenaceTemp_machineTypes'].destroy(
                                        {
                                            where: {
                                                maintenance_template_id: params.maintenance_template_id,
                                                machine_type_id: oldMachinetypes
                                            }
                                        }).then(res => {
                                    })

                                if (i === oldMachinetype.length - 1) {
                                    resolve(oldMachinetypes)
                                }
                                i++
                            })})

                        Promise.all([promise5]).then(res1 => {
                            res.send({
                                message : 'No machine_type to insert',
                                data : []
                            })
                        })

                    }
                })
            } else {
                console.log('params')
                    if (params && params.machinestypes) {
                        var promise4= new Promise(function (resolve, reject) {
                            let i = 0
                            params.machinestypes.forEach(newmachinetype => {

                                if (oldMachinetype.indexOf(newmachinetype) === -1) {
                                    console.log('newmachinetype', newmachinetype)
                                    var modalObj = _this.db[_this.baseModal].build({
                                        maintenance_template_id: params.maintenance_template_id,
                                        machine_type_id: newmachinetype
                                    });
                                    modalObj.save().then(result => {

                                    });

                                }
                                if (i === params.machinestypes.length - 1) {
                                    resolve(modalObj)
                                }
                                i++
                            })
                        })
                        Promise.all([promise4]).then(res1 => {
                            res.send(res1[0])
                        })
                    } else { res.send({data: []})}

            }


        })
    }

    get_machine_type_by_id_maintenance(req, res, next) {

        this.db['maintenaceTemp_machineTypes'].findAll({
            where: {

                maintenance_template_id: req.params.maintenance_template_id
            }
        }).then(data => {
            res.send({
                success: true,
                data: data
            })
        })
    }

get_machine_type_Info(req,res,next){
        let _this = this
        var machine_types =[]
    this.db['maintenaceTemp_machineTypes'].findAll({
        where: {

            maintenance_template_id: req.params.maintenance_template_id
        }
    }).then(data => {
 console.log('data.length',data.length)
        if(data && data.length!==0) {
            var promise5= new Promise(function (resolve, reject) {
                let i = 0
            data.forEach(item=>{
                _this.db['machine_types'].findByPk(item.machine_type_id).then(machinetype => {
                   machine_types.push(machinetype)
                    if(i === data.length - 1 ) {
                        resolve(machine_types)
                    }
                    i++

       })

            })
            })
            Promise.all([promise5]).then(function(machine_types){
                res.send({data: machine_types[0], success: true})
            })

        } else {
            res.send({
                data: [],
                message: 'No Model exist'
            })
        }

    })
}
}

module.exports = MaintenaceTemp_MachineTypeDao;
