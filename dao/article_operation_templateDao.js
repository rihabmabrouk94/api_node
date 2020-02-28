const {baseModelDao} = require('./baseModalDao');

class ArticleOperationTemplateDao extends baseModelDao {
    constructor() {
        super('article_operation_templates', 'article_operation_template_id');
        this.baseModal = 'article_operation_templates';
        this.primaryKey = 'article_operation_template_id';
    }

    updateArticleOperationTemplate(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['article_operation_templates'].findAll({
            include: [{
                model: this.db['operation_templates'],
                as: 'operation_template',
            }],
            where: {

                article_id: params.article_id
            }
        }).then(data => {
            var oldOperationTemplates = [];

            data.forEach(operation_template => {
                oldOperationTemplates.push(operation_template.operation_template.operation_template_id);
            });

            if (params && params.operation_templates) {

                params.operation_templates.forEach(newOperation_template => {

                    if(oldOperationTemplates.indexOf(newOperation_template) === -1) {

                        var modalObj = this.db[this.baseModal].build({
                            article_id: params.article_id,
                            operation_template_id: newOperation_template
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldOperationTemplates.forEach(oldOperationTemplates =>{
                    if(params.operation_templates.indexOf(oldOperationTemplates)==-1){

                        this.db['article_operation_templates'].destroy(
                            {
                                where : {
                                    article_id: params.article_id,
                                    operation_template_id: oldOperationTemplates
                                }
                            }).then(res=>{})
                    }
                })
            }
            res.send(oldOperationTemplates)
        })
    }

    getOperationTemplate(req, res, next) {
        console.log('article_ id', req.params.article_id)
        this.db['article_operation_templates'].findAll({
            // include: [{
            //     model: this.db['operation_templates'],
            //     as: 'operation_template',
            // }],
            where: {

                article_id: req.params.article_id
            }
        }).then(data => {
            res.send({
                success: true,
                data: data
            })
        })
    }
}

module.exports = ArticleOperationTemplateDao;
