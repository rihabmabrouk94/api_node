const {baseModelDao} = require('./baseModalDao');

class MachineDao extends baseModelDao {
    constructor() {
        super('machines', 'machine_id');
        this.baseModal = 'machines';
        this.primaryKey = 'machine_id';
    }

    infoMachineAction(req, res, next) {
        let usersession_id = req.query.usersession_id;
        let box_macaddress = req.query.box_macaddress;
        if (usersession_id) {
            this.db['usersessions'].findOne({
                where: {
                    usersession_id: usersession_id
                }
            }).then(usersessions => {
                if (usersessions) {
                    this.db['boxes'].findOne({
                        where: {
                            box_id: usersessions.box_id,
                        }
                    }).then(boxes => {
                        if (boxes) {
                            this.db['machines'].findOne({
                                include: [
                                    {
                                        model: this.db['machine_types']
                                    },
                                    {
                                        model: this.db['machine_groups']
                                    }
                                ],
                                where: {
                                    machine_id: boxes.machine_id
                                }
                            }).then(machines => {
                                res.json({
                                    success: true,
                                    data: machines,
                                    messages: [{
                                        userMessage: "Machine info with success",
                                        internalMessage: 'Machine info with success',
                                        code: 6001,
                                        more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/6001"
                                    }],
                                    attributes: [],
                                    status: 200
                                })
                            })
                        } else {
                            res.json({
                                success: false,
                                data: null,
                                messages: [{
                                    userMessage: "Box does not exists",
                                    internalMessage: 'Box does not exists',
                                    code: 1041,
                                    more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1041"
                                }],
                                attributes: [],
                                status: 500
                            })
                        }
                        ;
                    })
                } else {
                    res.json({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "User session not exists",
                            internalMessage: 'User session not exists',
                            code: 1008,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1008"
                        }],
                        attributes: [],
                        status: 500
                    });
                }

            })
        } else if (box_macaddress) {
            this.db['boxes'].findOne({
                where: {
                    box_macaddress: box_macaddress
                }
            }).then(boxes => {
                if (boxes) {
                    this.db['machines'].findOne({
                        include: [
                            {
                                model: this.db['machine_types']
                            },
                            {
                                model: this.db['machine_groups']
                            }
                        ],
                        where: {
                            machine_id: boxes.machine_id
                        }
                    }).then(machines => {
                        res.json({
                            success: true,
                            data: machines,
                            messages: [{
                                userMessage: "Machine info with success",
                                internalMessage: 'Machine info with success',
                                code: 6001,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/6001"
                            }],
                            attributes: [],
                            status: 200
                        })
                    })
                } else {
                    res.json({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "Box does not exists",
                            internalMessage: 'Box does not exists',
                            code: 1041,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/1041"
                        }],
                        attributes: [],
                        status: 500
                    })
                }
                ;
            })
        }


    }

    getMachineFailure(req, res, next) {
        let db = require('../models');

        let sql = 'SELECT mch.*, count(vmtskd.*) as total_tickets_opened, SUM(vmtskd.offline_duration) as total_break_down_time, lin.line_label\n' +
            'FROM machines as mch\n' +
            'JOIN views_maintenance_task_data as vmtskd on mch.machine_id = vmtskd.machine_id\n' +
            'LEFT JOIN lines as lin on lin.line_id = mch.line_id\n' +
            'WHERE mch.active = \'Y\'\n' +
            'GROUP BY mch.machine_id, lin.line_id\n' +
            'ORDER BY (CASE WHEN SUM(vmtskd.offline_duration) IS NULL THEN 0 ELSE 1 END) DESC, SUM(vmtskd.offline_duration) DESC, count(vmtskd.*) DESC';

        db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(data => {
                res.send({
                    success: true,
                    data: data
                })

            })
    }


    getMachinesBundles(line_id) {
        let db = require('../models');

        return new Promise(function (resolve1, reject) {

            var machine_result = []
            db['machines'].findAll({

                order: [
                    ['machine_id', 'DESC']
                ],
                where: {
                    line_id: line_id,
                    active: 'Y'
                }
            }).then(machines => {
                if (machines && machines.length > 0) {
                    var bundles = []
                    var promise1 = new Promise(function (resolve, reject) {
                        let i = 0
                        machines.forEach(machine_item => {
                            let machine = {
                                machine_id: machine_item.machine_id,
                                machine_label: machine_item.machine_label,
                                bundles: [],
                                numberofbundles: 0,
                                maxbundle: false
                            }


                            let sql = ' SELECT bundle_id, code_bundle FROM (\n' +
                                ' SELECT  m.machine_id, m.machine_label, b.box_id, us.usersession_id , cps.session_id, cpo.cart_pending_operation_id , bundles.bundle_id , cpo.finished , bundles.code_bundle FROM machines m\n' +
                                'LEFT JOIN boxes b on b.machine_id= m.machine_id\n' +
                                'LEFT JOIN usersessions us on us.box_id= b.box_id\n' +
                                'LEFT JOIN cart_pending_sessions cps on cps.session_id = us.usersession_id\n' +
                                'LEFT JOIN cart_pending_operations cpo on cpo.cart_pending_operation_id = cps.cart_pendingoperation_id\n' +
                                'LEFT JOIN bundles on  bundles.bundle_id = cpo.bundle_id\n' +
                                'WHERE m.line_id = ' + '\'' + line_id + '\'' + 'AND  us.usersession_id IS NOT NULL    AND us.time_out IS NULL   AND cpo.finished = 0\n' +
                                ' ) as bundless WHERE machine_id = ' + machine_item.machine_id + ' group by bundle_id, code_bundle\n';

                            db.sequelize.query(sql,
                                {type: db.sequelize.QueryTypes.SELECT})
                                .then(bundles => {
                                    var promise2 = new Promise(function (resolve, reject) {
                                        let i = 0
                                        if (bundles && bundles.length > 0) {

                                            bundles.forEach(bundle_item => {
                                                let bundle = {
                                                    bundle_id: bundle_item.bundle_id,
                                                    code_bundle: bundle_item.code_bundle
                                                }
                                                machine.bundles.push(bundle)
                                                machine.numberofbundles = machine.numberofbundles + 1
                                                if (i === bundles.length - 1) {
                                                    resolve(machine)

                                                }
                                                i++
                                            })
                                        } else {
                                            resolve(machine)
                                        }


                                    })

                                    Promise.all([promise2]).then(function (machine_res) {

                                        machine_result.push(machine_res[0])


                                        let maxbundle = 0;
                                        let machineindex = 0;

                                        for (let i = 0; i < machine_result.length; i++) {

                                            if (machine_result[i].numberofbundles > maxbundle) {
                                                maxbundle = machine_result[i].numberofbundles
                                                machineindex = i


                                            }


                                        }
                                        if (maxbundle > 0) {
                                            machine_result[machineindex].maxbundle = true


                                            for (let i = 0; i < machine_result.length; i++) {

                                                if (machine_result[i].numberofbundles === maxbundle) {
                                                    machine_result[i].maxbundle = true
                                                }
                                            }

                                        }


                                        if (i === machines.length - 1) {
                                            resolve(machine_result)
                                        }
                                        i++

                                    })


                                })


                        })
                    })

                    Promise.all([promise1]).then(function (ff) {

                        resolve1(ff[0])
                    })

                } else {
                    resolve1([]);
                }
            })

        })

    }

    getAllbundleBymachineBylines(req, res, next) {
        let line_id = req.params.line_id

        let _this = this;
        _this.getAllbundleBymachineByline(line_id).then(lines => {
            res.send({
                data: lines[0],
                success: true
            })
        })

    }

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    getAllbundleBymachineByline(line_id) {

        let _this = this;
        var alllines = [];
        let db = require('../models');
        return new Promise(function (resolve, reject) {
            if (line_id === 'all') {
                db['lines'].findAll().then(lines => {
                    if (lines) {

                        var promise1 = new Promise(function (resolve, reject) {
                            let i = 0
                            lines.forEach(line_item => {
                                let line = {
                                    line_id: line_item.line_id,
                                    line_label: line_item.line_label,
                                    machinesBundles: []

                                }
                                var promise2 = new Promise(function (resolve, reject) {
                                    let i = 0
                                    _this.getMachinesBundles(line_item.line_id).then
                                    (machines => {

                                        if (machines && machines.length > 0) {

                                            machines.forEach(machine_item => {
                                                line.machinesBundles.push(machine_item)

                                                if (i === machines.length - 1) {
                                                    resolve(line)
                                                }
                                                i++
                                            })
                                        } else {
                                            resolve(line)
                                        }


                                    })


                                })
                                Promise.all([promise2]).then(function (machine_res) {
                                    machine_res[0].machinesBundles = machine_res[0].machinesBundles.sort(_this.dynamicSort('machine_id'))


                                    alllines.push(machine_res[0])

                                    if (i === lines.length - 1) {
                                        resolve(alllines)
                                    }
                                    i++
                                })

                            })

                        })
                        Promise.all([promise1]).then(function (linesss) {
                            alllines = alllines.sort(_this.dynamicSort('line_label'))
                            resolve(linesss)
                        })
                    } else {
                        resolve([])
                    }
                })


            } else {
                db['lines'].findOne({
                    where: {
                        line_id: line_id,
                        active: 'Y',

                    }
                }).then(lineitem => {
                    if (lineitem) {
                        let line = {
                            line_id: lineitem.line_id,
                            line_label: lineitem.line_label,
                            machinesBundles: []
                        }
                        _this.getMachinesBundles(lineitem.line_id).then(machines => {

                            var promise3 = new Promise(function (resolve, reject) {
                                let i = 0
                                if (machines && machines.length > 0) {
                                    machines.forEach(machine_item => {

                                        line.machinesBundles.push(machine_item)

                                        if (i === machines.length - 1) {
                                            resolve(line)
                                        }
                                        i++
                                    })
                                } else {
                                    resolve(line)
                                }


                            })
                            Promise.all([promise3]).then(function (machine_res) {
                                machine_res[0].machinesBundles = machine_res[0].machinesBundles.sort(_this.dynamicSort('machine_id'))

                                alllines.push(line)
                                alllines = alllines.sort(_this.dynamicSort('line_label'))
                                resolve([alllines])
                            })


                        })

                    } else {
                        resolve([])
                    }
                })


            }
        })
    }

    getallmachinebylinebyallsite(req, res, next) {
        let db = require('../models');
        var sites = []
        let _this = this
        let site_id = req.params.site_id
        if (site_id === 'all') {
            db['sites'].findAll({
                where: {
                    active: 'Y'
                }
            }).then(sitess => {
                if (sitess && sitess.length > 0) {

                    var promise1 = new Promise(function (resolve, reject) {
                        let i = 0
                        sitess.forEach(site_item => {

                            let site = {
                                site_id: site_item.site_id,
                                site_label: site_item.site_label,
                                lines: []
                            }
                            db['lines'].findAll({
                                where: {
                                    site_id: site_item.site_id,
                                    active: 'Y'
                                }
                            }).then(lines => {
                                if (lines && lines.length > 0) {
                                    var promise2 = new Promise(function (resolve, reject) {
                                        let i = 0
                                        lines.forEach(line_item => {
                                            _this.getAllbundleBymachineByline(line_item.line_id).then(line => {
                                                site.lines.push(line[0][0])
                                                if (i === lines.length - 1) {
                                                    resolve(site)
                                                }
                                                i++
                                            })

                                        })

                                    })
                                    Promise.all([promise2]).then(function (sitee) {
                                        site.lines = site.lines.sort(_this.dynamicSort('line_label'))
                                        sites.push(site)

                                       if( sites.length === sitess.length){
                                           resolve(sites)
                                       }
                                i++
                                 })


                                } else {
                                    sites.push(site)
                                }

                            })

                        })

                    })

                    Promise.all([promise1]).then(function (site_res) {
                        sites = sites.sort(_this.dynamicSort('site_label'))
                        res.send({
                            data: sites,
                            success: true
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

            db['sites'].findOne({
                where: {
                    site_id: site_id,
                    active: 'Y'
                }
            }).then(site_res => {

                if (site_res) {

                    let site = {
                        site_id: site_res.site_id,
                        site_label: site_res.site_label,
                        lines: []
                    }
                    db['lines'].findAll({
                        where: {
                            site_id: site_res.site_id,
                            active: 'Y'
                        }
                    }).then(lines => {
                        if (lines && lines.length > 0) {

                            var promise2 = new Promise(function (resolve, reject) {
                                let i = 0
                                lines.forEach(line_item => {
                                    _this.getAllbundleBymachineByline(line_item.line_id).then(line => {

                                        site.lines.push(line[0][0])
                                        if (i === lines.length - 1) {
                                            resolve(site)
                                        }
                                        i++
                                    })

                                })
                            })
                            Promise.all([promise2]).then(function (sitee) {
                                site.lines = site.lines.sort(_this.dynamicSort('line_label'))
                                sites.push(site)

                                res.send({
                                    data: sites,
                                    success: true
                                })


                            })

                        } else {
                            res.send({
                                data: [site],
                                success: true
                            })
                        }

                    })

                } else {

                    res.send({
                        data: [],
                        success: true
                    })

                }


            })


        }


    }

    getallbundlemachinebylinebysite(req, res, next) {

        let db = require('../models');
        var lines = []
        let _this = this
        let site_id = req.params.site_id
        let line_id = req.params.line_id
        if (site_id === 'all' && line_id === 'all') {
            _this.getAllbundleBymachineByline('all').then(lines => {
                res.send({
                    data: lines[0],
                    success: true
                })
            })


        } else if (line_id === 'all' && site_id !== 'all') {

            db['sites'].findOne({
                where: {
                    site_id: site_id,
                    active: 'Y'
                }
            }).then(site_res => {

                if (site_res) {


                    db['lines'].findAll({
                        where: {
                            site_id: site_res.site_id,
                            active: 'Y'
                        }
                    }).then(lines_res => {

                        if (lines_res && lines_res.length > 0) {

                            var promise2 = new Promise(function (resolve, reject) {
                             let i = 0
                                lines_res.forEach(line_item => {
                                    _this.getAllbundleBymachineByline(line_item.line_id).then(line => {

                                        lines.push(line[0][0])

                                    if( lines.length === lines_res.length  ){
                                        resolve(lines)
                                        i++
                                    }
                                    })

                                })
                            })
                            Promise.all([promise2]).then(function (sitee) {

                                lines = lines.sort(_this.dynamicSort('line_label'))
                                res.send({
                                    data: lines,
                                    success: true
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

                    res.send({
                        data: [],
                        success: true
                    })

                }


            })


        } else if ((site_id === 'all' && line_id !== 'all') || (site_id !== 'all' && line_id !== 'all')) {
            _this.getAllbundleBymachineByline(line_id).then(lines => {
                lines = lines.sort(_this.dynamicSort('line_label'))
                res.send({
                    data: lines[0],
                    success: true
                })
            })

        }

    }


}


module.exports = MachineDao;
