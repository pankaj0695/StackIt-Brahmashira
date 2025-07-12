const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const auth = require("../middleware/auth");

router.post("/answer/:id", auth, voteController.voteAnswer);
router.post("/question/:id", auth, voteController.voteQuestion);

module.exports = router;
