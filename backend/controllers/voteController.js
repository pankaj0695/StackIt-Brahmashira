const Answer = require("../models/answer");
const Question = require("../models/question");

exports.voteAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const { vote } = req.body; // vote: 'up' or 'down'
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    if (vote === "up") {
      answer.upvotes += 1;
    } else if (vote === "down") {
      answer.downvotes += 1;
    } else {
      return res.status(400).json({ message: "Invalid vote type" });
    }
    await answer.save();
    res.json({
      message: "Vote registered",
      upvotes: answer.upvotes,
      downvotes: answer.downvotes,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.voteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { vote } = req.body; // vote: 'up' or 'down'
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    if (vote === "up") {
      question.likes += 1;
    } else if (vote === "down") {
      question.likes -= 1;
    } else {
      return res.status(400).json({ message: "Invalid vote type" });
    }
    await question.save();
    res.json({ message: "Vote registered", likes: question.likes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
