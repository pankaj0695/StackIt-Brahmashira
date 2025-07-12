const mongoose = require('mongoose');
const { Schema } = mongoose;

const followerSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followingId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Follower = mongoose.model('Follower', followerSchema);
module.exports = Follower;
