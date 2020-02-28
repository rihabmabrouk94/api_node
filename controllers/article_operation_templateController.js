const ArticleOperationTemplates = require('../dao/article_operation_templateDao');
var articleOperationTemplatesInst = new ArticleOperationTemplates();

module.exports =
    {
        update: function (req, res, next) {
            articleOperationTemplatesInst.update(req, res, next);
        },
        get: function (req, res, next) {
            articleOperationTemplatesInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            articleOperationTemplatesInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            articleOperationTemplatesInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            articleOperationTemplatesInst.delete(req, res, next);
        },
        updateArticleOperationTemplate : function(req,res,next) {
            articleOperationTemplatesInst.updateArticleOperationTemplate(req,res,next);
        },
        getOperationTemplate: function (req, res, next) {
            articleOperationTemplatesInst.getOperationTemplate(req, res, next);
        }
    };
