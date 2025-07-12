const Answer = require('../models/answer');
const Question = require('../models/question');

// 1. Add Answer
exports.addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    const userId = req.user._id; // assuming auth middleware sets req.user

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const answer = new Answer({
      questionId,
      authorId: userId,
      content
    });

    const savedAnswer = await answer.save();

    // Update question: push answer ID
    question.answerIds.push(savedAnswer._id);
    await question.save();

    res.status(201).json({ message: 'Answer added', answer: savedAnswer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add answer', details: error.message });
  }
};

// 2. Edit Answer
exports.editAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    if (!answer.authorId.equals(userId)) {
      return res.status(403).json({ error: 'Unauthorized to edit this answer' });
    }

    answer.content = content;
    answer.updatedAt = new Date();
    await answer.save();

    res.status(200).json({ message: 'Answer updated', answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit answer', details: error.message });
  }
};

// 3. Delete Answer
exports.deleteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    if (!answer.authorId.equals(userId)) {
      return res.status(403).json({ error: 'Unauthorized to delete this answer' });
    }

    // Remove reference from question
    await Question.findByIdAndUpdate(answer.questionId, {
      $pull: { answerIds: answer._id }
    });

    await answer.deleteOne();

    res.status(200).json({ message: 'Answer deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete answer', details: error.message });
  }
};

// 4. Accept Answer
exports.acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    const question = await Question.findById(answer.questionId);
    if (!question) return res.status(404).json({ error: 'Parent question not found' });

    if (!question.authorId.equals(userId)) {
      return res.status(403).json({ error: 'Only question author can accept an answer' });
    }

    // Unmark previous accepted answer
    await Answer.updateMany(
      { questionId: question._id },
      { isAccepted: false }
    );

    answer.isAccepted = true;
    await answer.save();

    question.acceptedAnswerId = answer._id;
    await question.save();

    res.status(200).json({ message: 'Answer marked as accepted', answerId: answer._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept answer', details: error.message });
  }
};
