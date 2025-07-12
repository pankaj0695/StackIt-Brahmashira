const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");
const { body, param } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/:questionId",
  auth,
  [body("content").notEmpty()],
  answerController.addAnswer
);
router.put("/:id", auth, answerController.editAnswer);
router.delete("/:id", auth, answerController.deleteAnswer);
router.patch("/accept/:id", auth, answerController.acceptAnswer);

module.exports = router;
