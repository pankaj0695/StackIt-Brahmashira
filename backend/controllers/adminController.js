const User = require('../models/user');
const Report = require('../models/report');
const Question = require('../models/question');
const Notification = require('../models/notification');


exports.getReports = async(req, res) => {
  res.send("Get reports");
};
exports.banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { isBanned: true }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${user.username} has been banned`, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to ban user', details: error.message });
  }
};
exports.getPendingQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isFlagged: true }).populate('authorId');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get flagged questions', details: error.message });
  }
};
exports.sendPlatformMessage = async(req, res) => {
  res.send("Send platform message");
};
