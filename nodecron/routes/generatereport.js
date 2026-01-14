const express = require("express");
const router = express.Router();
const { getDailySummary } = require("../controllers/generatereport");

router.get("/report", getDailySummary);

module.exports = router;
