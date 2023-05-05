const express = require("express");
const router = express.Router();
const analyseController = require("../controllers/analyse.controller");

router.post("/saveAnalyse", analyseController.saveAnalyse);
router.post("/saveAnalyseOrd", analyseController.saveAnalyseOrd);
router.get("/listAnalyse", analyseController.listAnalyse);
router.get("/", analyseController.getAnalyse);
router.put("/updateAnalyse/:id", analyseController.updateAnalyse);
router.delete("/deleteAnalyse/:id", analyseController.deleteAnalyse);
router.get('/analyseByID/:id',analyseController.analyseID);
router.get("/getAnalyse/:id",analyseController.getAnalyseID);
router.delete("/deleteallAnalyse",analyseController.deleteAllAnalyse);
module.exports = router;