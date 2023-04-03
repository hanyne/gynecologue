const express = require('express');
const router = require("express").Router();
const app = express()
const articleRoutes = express.Router();
const cors = require('cors');

const Article = require('../models/article');

router.use(cors());

// Get all article
articleRoutes.get('/', (req, res) => {
  Article.find((err, article) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(article);
    }
  });
});

// Add new article
articleRoutes.post('/new', (req, res) => {
  const article = new Article({
    title:req.body.title,
    description:req.body.description,
    shortDesc: req.body.shortDesc,
    photo:req.body.photo,
   
  });

  article.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(article);
    }
  });
});

// Delete article
articleRoutes.post('/destroy', (req, res) => {
  Article.findByIdAndRemove(req.body._id, (err, article) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(article);
    }
  });
});

module.exports = articleRoutes;
