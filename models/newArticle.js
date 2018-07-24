const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ArticleSchema = schema({
  url: String,
  title: String,
  summary: String,
  createdAt: Date
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;