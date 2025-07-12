const Report = require("../models/report");

exports.reportQuestion = async (req, res) => {
  try {
    const reporterId = req.user._id;
    const targetId = req.params.id;
    const { reason, details } = req.body;
    const report = new Report({
      reporterId,
      targetType: "question",
      targetId,
      reason,
      details,
    });
    await report.save();
    res.status(201).json({ message: "Question reported", report });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error reporting question", error: err.message });
  }
};

exports.reportAnswer = async (req, res) => {
  try {
    const reporterId = req.user._id;
    const targetId = req.params.id;
    const { reason, details } = req.body;
    const report = new Report({
      reporterId,
      targetType: "answer",
      targetId,
      reason,
      details,
    });
    await report.save();
    res.status(201).json({ message: "Answer reported", report });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error reporting answer", error: err.message });
  }
};

exports.reportComment = async (req, res) => {
  try {
    const reporterId = req.user._id;
    const targetId = req.params.id;
    const { reason, details } = req.body;
    const report = new Report({
      reporterId,
      targetType: "comment",
      targetId,
      reason,
      details,
    });
    await report.save();
    res.status(201).json({ message: "Comment reported", report });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error reporting comment", error: err.message });
  }
};
