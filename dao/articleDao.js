const {baseModelDao} = require('./baseModalDao');

class ArticleDao extends baseModelDao {
    constructor() {
        super('articles', 'article_id');
        this.baseModal = 'articles';
        this.primaryKey = 'article_id';
    }

}

module.exports = ArticleDao;
