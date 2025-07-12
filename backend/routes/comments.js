const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { body } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/answer/:answerId",
  auth,
  [body("content").notEmpty()],
  commentController.addCommentToAnswer
);
router.put("/:id", auth, commentController.editComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
