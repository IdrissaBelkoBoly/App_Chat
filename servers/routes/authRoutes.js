const express = require("express");
const {
  registerController,
  loginController,
  verifyEmailController,
  verifyTokenController,
} = require("../controllers/authController");

const router = express.Router();

// Routes d'authentification
router.post("/register", registerController);
router.get("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.post("/verify-token", verifyTokenController);


module.exports = router;
