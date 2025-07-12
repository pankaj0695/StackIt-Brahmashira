// Backend

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes (to be implemented in separate files)
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answers");
const commentRoutes = require("./routes/comments");
const voteRoutes = require("./routes/votes");
const reportRoutes = require("./routes/reports");
const notificationRoutes = require("./routes/notifications");
const adminRoutes = require("./routes/admin");

// Use routes
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/comments", commentRoutes);
app.use("/votes", voteRoutes);
app.use("/report", reportRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);

// Connect to MongoDB (update URI as needed)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
