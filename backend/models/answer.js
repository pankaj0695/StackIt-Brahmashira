const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  isAccepted: {
    type: Boolean,
    default: true
  },
  commentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, {
  timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
