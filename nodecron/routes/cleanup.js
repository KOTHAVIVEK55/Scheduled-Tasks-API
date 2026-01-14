const express = require("express");
const router = express.Router();
const { runSessionCleanup } = require("../controllers/cleanup");

router.post("/clean", runSessionCleanup);

module.exports = router;
