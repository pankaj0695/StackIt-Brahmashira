const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  authController.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  authController.login
);

router.post("/logout", authController.logout);

module.exports = router;
