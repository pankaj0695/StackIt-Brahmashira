const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  answerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
