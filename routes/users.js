const express = require("express");
const router = express.Router();
const { createCar ,riskRating , createQuote } = require('../controllers/controls');



router.route("/carvalue").post(createCar);
router.route("/riskrating").post(riskRating);
router.route("/quote").post(createQuote );

 

module.exports = router;