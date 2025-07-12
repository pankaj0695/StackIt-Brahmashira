const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth");

router.post(
  "/register",
  [
    body("name").isEmail(),
    body("username").isEmail(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  authController.login
);

router.post("/logout", authController.logout);
router.post(
  "/updateprofile",
  authMiddleware,
  [
    body("name").optional().isString(),
    body("username").optional().isString(),
    body("email").optional().isEmail(),
    body("bio").optional().isString(),
  ],
  authController.updateProfile
);

module.exports = router;
