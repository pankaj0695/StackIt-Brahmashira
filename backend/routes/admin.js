const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/reports", auth, admin, adminController.getReports);
router.patch("/users/:id/ban", auth, admin, adminController.banUser);
router.get(
  "/questions/pending",
  auth,
  admin,
  adminController.getPendingQuestions
);
router.post("/message", auth, admin, adminController.sendPlatformMessage);

module.exports = router;
