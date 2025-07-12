const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetType: {
    type: String,
    enum: ['question', 'answer', 'comment'],
    required: true
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'dismissed', 'action_taken'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
