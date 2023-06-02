const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
const consultationController = require("../controllers/consultation.controller");
router.post("/:patientId/create",upload.single('photo'),consultationController.saveConsult);
router.get("/patient/:patientId", consultationController.getConsult);
router.get('/read/:id',consultationController.getAllconsult);
router.put("/update/:id", consultationController.updateConsult);
router.delete("/delete/:id", consultationController.deleteConsult);
module.exports = router;