const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ArticleSchema = new Schema({
  url: String,
  title: String,
  summary: String,
  createdAt: Date
});

const Article = new mongoose.model(ArticleSchema, 'Article');

module.exports = Article;