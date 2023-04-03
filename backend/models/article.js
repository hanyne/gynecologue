// article.model.js

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDesc: { type: String, required: true },
  photo: { type: String, required: true },
});

module.exports = mongoose.model('Article', articleSchema);
