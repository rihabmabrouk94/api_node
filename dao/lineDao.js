const {baseModelDao} = require('./baseModalDao');

class LineDao extends baseModelDao {
    constructor() {
        super('lines', 'line_id');
        this.baseModal = 'lines';
        this.primaryKey = 'line_id';
    }

    getlinesbysite(req,res, next){
    let db = require('../models');

    let site_id = req.params.site_id
    if(site_id === 'all') {
        db['lines'].findAll({
            where:{
                active: 'Y'}
        }).then(lines=>{
            res.send({
                data: lines,
                success: true
            })
        })
   }
    else {
        db['lines'].findAll({
            where:{ site_id: site_id,
            active: 'Y'}
        }).then(lines=>{
            res.send({
                data: lines,
                success: true
            })
        })
    }
}

    getBoxByLine(req,res, next){

        let line_id = req.params.line_id
        let _this= this;
        _this.db['lines'].findOne({
            where:{
                active: 'Y',
                line_id: line_id
            }
        }).then(lines=>{
            if(lines){
                _this.db['boxes'].findAll({
                    where:{
                        active: 'Y',
                        line_id: lines.line_id
                    },
                    include: [
                        {
                            model: this.db['box_types'],
                        },
                        {
                            model: this.db['mtbox_builds'],
                        },
                        {
                            model: this.db['machines'],
                            include:[
                                {model: this.db['machine_types']}
                            ]
                        },
                        {
                            model: this.db['gateways'],
                        }
                    ],
                    order: [
                        ['box_order', 'ASC']
                    ]
                }).then(boxes=>{
                    res.send({
                        success: true,
                        data: boxes,
                        messages: [{
                            message: 'Boxes By Line with success',
                            internalMessage: 'Boxes By Line with success',
                        }],
                        attributes: [],
                        status: 200
                    });
                })
            }else{
            res.send({
                success: false,
                data: null,
                messages: [{
                    message: 'Line not exist',
                    internalMessage: 'Line not exist',
                }],
                attributes: [],
                status: 500
            });
        }
        })


    }

    getArticleByLine(req,res, next){

        let line_id = req.params.line_id;
        let _this= this;

        _this.db['lines'].findOne({
            where:{
                active: 'Y',
                line_id: line_id
            }
        }).then(lines=>{
            if(lines){
                _this.db['line_articles'].findAll({
                    where:{
                        active: 'Y',
                        line_id: lines.line_id
                    },
                    include:[
                        {
                            model: this.db['lines'],
                        },
                        {
                            model: this.db['articles']
                        },
                    ]
                }).then(line_articles=>{
                    res.send({
                        success: true,
                        data: line_articles,
                        messages: [{
                            message: 'Articles By Line with success',
                            internalMessage: 'Articles By Line with success',
                        }],
                        attributes: [],
                        status: 200
                    });
                })
            }else{
                res.send({
                    success: false,
                    data: null,
                    messages: [{
                        message: 'Line not exist',
                        internalMessage: 'Line not exist',
                    }],
                    attributes: [],
                    status: 500
                });
            }

        })

    }

}

module.exports = LineDao;
