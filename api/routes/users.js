const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app",
};

router.post("/register", cors(corsData), userController.register);
router.post("/login", cors(corsData), userController.login);
router.post("/logout", cors(corsData), userController.logout);
router.get("/places", cors(corsData), userController.UserPlaces);

module.exports = router;
