const {baseModelDao} = require('./baseModalDao');

class BoxDao extends baseModelDao {
    constructor() {
        super('boxes', 'box_id');
        this.baseModal = 'boxes';
        this.primaryKey = 'box_id';
    }
    MachineAffectAction(req, res, next) {
        let rfid_cart_machine = req.query.rfid;
        let addr = req.query.source_addr;
        if(rfid_cart_machine === null || rfid_cart_machine ===''){
            res.json({message :"RFID_MACHINE_NOT_PROVIDED"})
        }
        else if(addr === null || addr ===''){
            res.json({message :"ADDR_NOT_PROVIDED"})
        }
        else {
        rfid_cart_machine.substr(0, 10)
        this.db['boxes'].findOne(
            {
                include: [
                    {
                        model: this.db['machines'],
                        where:
                            {
                                rfid_cart : rfid_cart_machine

                            }
                    },
                ],
                where:
                    {
                        box_macaddress : addr
                    }

            }).then(function (boxes) {
                if (!boxes) {
                    res.send({
                        "_msg": "INEXIST_CART",
                    });
                }
                else
                if(boxes){
                    res.json({
                        message: 'Success',
                        boxes: boxes,
                        success: true,
                        result: 1
                    });
                }
            }
        ).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: error });
        });
    }}



    BulkUpdate(req, res, next) {
        let _this= this;

        _this.db['mtbox_builds'].findOne({
            where: {
                version: req.body.mtbox_build.version,
                active: 'Y'
            }
        }).then(mtbox_builds => {

            if (mtbox_builds){

                _this.db['boxes'].findAll({
                    where: {
                        active: 'Y'
                    }
                }).then(boxes => {

                    if(boxes){

                        if (req.body.line_id !== undefined && req.body.line_id !==  null  && mtbox_builds.version !== null) {
                            _this.db['lines'].findOne({
                                where: {
                                    line_id: req.body.line_id,
                                    active: 'Y'
                                }
                            }).then(lines => {
                                if(lines){
                                    _this.db['boxes'].update(
                                        {
                                            mtbox_build_id: mtbox_builds.mtbox_build_id,
                                        },
                                        {
                                            where:{
                                                line_id: lines.line_id
                                            }
                                        }
                                    ).then(boxes1 => {
                                    })
                                    res.send({
                                        success: false,
                                        data: null,
                                        messages: [
                                            {
                                                userMessage: 'Version Updated with success',
                                                internalMessage: 'Version Updated with success',
                                                code: 10002
                                            }
                                        ]
                                    });
                                }else{

                                    res.send({
                                        success: false,
                                        data: null,
                                        messages: [
                                            {
                                                userMessage: 'Version Updated with success',
                                                internalMessage: 'Version Updated with success',
                                                code: 10002
                                            }
                                        ]
                                    });
                                }

                            })

                        }else
                           if((req.body.line_id === undefined ||  req.body.line_id ===  null)  && mtbox_builds.version !== null)
                            {
                                    boxes.forEach(function(box) {
                                        _this.db['boxes'].update(
                                            {
                                                mtbox_build_id: mtbox_builds.mtbox_build_id,
                                            },
                                            {
                                                where:{
                                                    active:'Y'
                                                }
                                            }

                                        ).then(boxes1 => {

                                        })
                                    })
                                    res.send({
                                        success: false,
                                        data: null,
                                        messages: [
                                            {
                                                userMessage: 'Version Updated with success',
                                                internalMessage: 'Version Updated with success',
                                                code: 1042
                                            }
                                        ]
                                    });



                        }




                    }
                   else{
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

            }else{
                res.send({
                    success: false,
                    data: null,
                    messages: [
                        {
                            userMessage: 'Mtbox Builds does not exists',
                            internalMessage: 'Mtbox Builds does not exists',
                            code: 1043
                        }
                    ]
                });
            }

        })



    }
}

module.exports = BoxDao;
