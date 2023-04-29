const express = require("express");
const router = express.Router();
const OrdController = require("../controllers/ord.controller");

router.post("/saveOrd", OrdController.saveOrd);
router.get("/listOrd", OrdController.getOrd);
router.put("/updateOrd/:id", OrdController.updOrd);
router.delete("/deleteOrd/:id", OrdController.deleteOrd);
router.get('/ordByID/:id',OrdController.ordID);

module.exports = router;