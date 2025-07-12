const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String,
      trim: true,
      lowercase: true
    }
  ],
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  isFlagged: {
    type: Boolean,
    default: false
  },
  answerIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ],
  acceptedAnswerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
    default: null
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
