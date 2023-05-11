const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const articleController = require("../controllers/article.controller");

// Multer configuration
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const  upload = multer({ storage: storageImage });
//routers
router.post('/',upload.single('photo'),articleController.saveArticle);
router.get("/",  articleController.AllArticle);
router.get("/:id", articleController.getOneArticle);
router.get("/getArticle",  articleController.countArticle);
router.delete("/:id",  articleController.deleteArticle);
router.patch("/:id", articleController.updateArticle);

module.exports = router;