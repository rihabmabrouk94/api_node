const {baseModelDao} = require('./baseModalDao');

class LineArticleDao extends baseModelDao {
    constructor() {
        super('line_articles', 'line_article_id');
        this.baseModal = 'line_articles';
        this.primaryKey = 'line_article_id';
    }

}

module.exports = LineArticleDao;
