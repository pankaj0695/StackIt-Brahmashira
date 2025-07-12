const Comment = require('../models/comment');
const Answer = require('../models/answer');

// 1. Add comment to an answer
exports.addCommentToAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    const comment = new Comment({
      answerId,
      authorId: userId,
      text
    });

    const savedComment = await comment.save();

    // Link comment to answer
    answer.commentIds.push(savedComment._id);
    await answer.save();

    res.status(201).json({ message: 'Comment added', comment: savedComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment', details: error.message });
  }
};

// 2. Edit a comment (by its author)
exports.editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.authorId.equals(userId)) {
      return res.status(403).json({ error: 'Unauthorized to edit this comment' });
    }

    comment.text = text;
    comment.updatedAt = new Date();
    await comment.save();

    res.status(200).json({ message: 'Comment updated', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit comment', details: error.message });
  }
};

// 3. Delete a comment (by its author)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.authorId.equals(userId)) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    // Remove comment ID from the answer's commentIds array
    await Answer.findByIdAndUpdate(comment.answerId, {
      $pull: { commentIds: comment._id }
    });

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment', details: error.message });
  }
};
