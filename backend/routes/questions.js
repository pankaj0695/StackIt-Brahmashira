const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { body, param } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/", questionController.getAllQuestions);
router.get("/user/:userId", questionController.getQuestionsByUser);
router.get("/:id", questionController.getQuestionById);
router.post(
  "/",
  auth,
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("tags").isArray({ min: 1 }),
  ],
  questionController.createQuestion
);
router.put("/:id", auth, questionController.updateQuestion);
router.delete("/:id", auth, questionController.deleteQuestion);

module.exports = router;
