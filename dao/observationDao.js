const {baseModelDao} = require('./baseModalDao');

class ObservationDao extends baseModelDao {
    constructor() {
        super('observations', 'observation_id');
        this.baseModal = 'observations';
        this.primaryKey = 'observation_id';
    }

    findTicketByObservation(req, res, next) {
        let _this = this;
        let observation_id = req.params.observation_id;
        _this.db['observations'].findOne({
            where: {
                observation_id: observation_id,
                active: 'Y'
            }
        })
            .then(observations => {
                if(observations) {
                    let limit = (req.query.limit) ? req.query.limit : 10;
                    let page = (req.query.page) ? req.query.page : 1;
                    let offset = 0;
                    _this.db['ticket_structures'].findAndCountAll({}).then((data) => {
                        let pages;
                        pages = Math.ceil(data.count / limit);
                        offset = limit * (page - 1)
                        _this.db['ticket_structures'].findAll({
                            include:[
                                {model:_this.db['lines']},
                                {model:_this.db['observations']},
                                {model:_this.db['operation_templates']},
                                {model:_this.db['jobs']},
                                {model:_this.db['status_tickets']},
                                {model:_this.db['boxes']},
                                {model:_this.db['bundles']},
                                {model:_this.db['orders']},
                                {model:_this.db['users']},
                                {model:_this.db['priorities']}
                            ],
                            limit: limit,
                            offset: offset,
                            $sort: {
                                id: 1
                            },
                            order : [
                                ['created_at', 'DESC']
                            ],
                            where: {
                                observation_id: observations.observation_id,
                                active: 'Y'
                            }
                        })
                            .then(ticket_structures => {
                                if (ticket_structures) {
                                    res.json({
                                        success: true,
                                        data: ticket_structures,
                                        messages: [{
                                            userMessage: "Ticket Info with success",
                                            internalMessage: 'Ticket Info with success',
                                            code: 8003,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8006"
                                        }],
                                        attributes: [{
                                            Total: data.count,
                                            totalPage: pages
                                        }],
                                        status: 200
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        data: null,
                                        messages: [{
                                            userMessage: "Ticket Info not exists",
                                            internalMessage: 'Ticket Info not exists',
                                            code: 8004,
                                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8007"
                                        }],
                                        attributes: [],
                                        status: 500
                                    });
                                }

                            })
                    })

                }else{
                    res.json({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: "Observation Info not exists",
                            internalMessage: 'Observation Info not exists',
                            code: 8004,
                            more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8008"
                        }],
                        attributes: [],
                        status: 500
                    });
                }
                }
            ).catch(err =>
            res.status(500).json(err)
        )
    }


    findObservation(req, res, next) {
        let _this = this;
        let line_id = req.query.line_id;

        _this.db['lines'].findOne({
            where: {
                line_id:line_id,
                active: 'Y'
            }
        })
            .then(lines => {
                if(lines){
                    let limit = (req.query.limit) ? req.query.limit : 10;
                    let page = (req.query.page) ? req.query.page : 1;
                    let offset = 0;
                    _this.db['observations'].findAndCountAll({}).then((data) => {
                        let pages;
                        pages = Math.ceil(data.count / limit);
                        offset = limit * (page - 1)
                        _this.db['observations'].findAll({
                            include: [
                                {model:_this.db['lines']}
                            ],
                            order : [
                                ['created_at', 'DESC']
                            ],
                            limit: limit,
                            offset: offset,
                            $sort: {
                                id: 1
                            },
                            where: {
                                line_id:lines.line_id,
                                active: 'Y'
                            }
                        })
                            .then(observations => {
                                    ;
                                    if(observations) {
                                        res.json({
                                            success: true,
                                            data: observations,
                                            messages: [{
                                                userMessage: "Observation Info with success",
                                                internalMessage: 'Observation Info with success',
                                                code: 8004,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8009"
                                            }],
                                            attributes: [{
                                                Total: data.count,
                                                totalPage: pages
                                            }],
                                            status: 500
                                        });
                                    }else{
                                        res.json({
                                            success: false,
                                            data: null,
                                            messages: [{
                                                userMessage: "Observation Info not exists",
                                                internalMessage: 'Observation Info not exists',
                                                code: 8004,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8008"
                                            }],
                                            attributes: [],
                                            status: 500
                                        });
                                    }
                                }
                            ).catch(err =>
                            res.status(500).json(err)
                        )
                    })

                }else{
                    let limit = (req.query.limit) ? req.query.limit : 10;
                    let page = (req.query.page) ? req.query.page : 1;
                    let offset = 0;
                    _this.db['observations'].findAndCountAll({}).then((data) => {
                        let pages;
                        pages = Math.ceil(data.count / limit);
                        offset = limit * (page - 1)
                        _this.db['observations'].findAll({
                            include: [
                                {model:_this.db['lines']}
                            ],
                            limit: limit,
                            offset: offset,
                            $sort: {
                                id: 1
                            },
                            order : [
                                ['created_at', 'DESC']
                            ],
                            where: {
                                active: 'Y'
                            }
                        })
                            .then(observations => {
                                    ;
                                    if(observations) {
                                        res.json({
                                            success: true,
                                            data: observations,
                                            messages: [{
                                                userMessage: "Observation Info with success",
                                                internalMessage: 'Observation Info with success',
                                                code: 8004,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8009"
                                            }],
                                            attributes: [{
                                                Total: data.count,
                                                totalPage: pages
                                            }],
                                            status: 500
                                        });
                                    }else{
                                        res.json({
                                            success: false,
                                            data: null,
                                            messages: [{
                                                userMessage: "Observation Info not exists",
                                                internalMessage: 'Observation Info not exists',
                                                code: 8004,
                                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/8008"
                                            }],
                                            attributes: [],
                                            status: 500
                                        });
                                    }
                                }
                            ).catch(err =>
                            res.status(500).json(err)
                        )
                    })
                }
            })





    }
}

module.exports = ObservationDao;
