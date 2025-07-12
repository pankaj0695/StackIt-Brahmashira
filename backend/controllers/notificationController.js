const Notification = require("../models/notification");
const User = require("../models/user");

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("notificationIds");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.notificationIds);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    notification.isRead = true;
    await notification.save();
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
