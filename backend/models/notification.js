const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["answer", "comment", "mention"],
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  answerId: {
    type: Schema.Types.ObjectId,
    ref: "Answer",
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
