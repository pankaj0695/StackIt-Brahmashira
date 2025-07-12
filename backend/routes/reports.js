const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middleware/auth");

router.post("/question/:id", auth, reportController.reportQuestion);
router.post("/answer/:id", auth, reportController.reportAnswer);
router.post("/comment/:id", auth, reportController.reportComment);

module.exports = router;
