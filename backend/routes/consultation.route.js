const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultation.controller");
router.post("/:patientId/create",consultationController.saveConsult);
router.get("/patient/:patientId", consultationController.getConsult);
router.get('/read/:id',consultationController.getAllconsult);
router.put("/update/:id", consultationController.updateConsult);
router.delete("/delete/:id", consultationController.deleteConsult);
module.exports = router;