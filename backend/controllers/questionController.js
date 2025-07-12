const Question = require("../models/question");
const User = require("../models/user");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("authorId", "name username")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getQuestionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const questions = await Question.find({ authorId: userId }).sort({
      createdAt: -1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "authorId",
      "name username"
    );
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const authorId = req.user._id;
    const question = new Question({ title, description, tags, authorId });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating question", error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    if (
      question.authorId.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const { title, description, tags } = req.body;
    if (title) question.title = title;
    if (description) question.description = description;
    if (tags) question.tags = tags;
    await question.save();
    res.json(question);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating question", error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    if (
      question.authorId.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await question.deleteOne();
    res.json({ message: "Question deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting question", error: err.message });
  }
};
