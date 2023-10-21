const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const multer = require("multer");
const photosMiddleware = multer({ dest: "/tmp" });
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app/",
};

router.use("/user", cors(corsData), require("./users"));
router.use("/places", cors(corsData), require("./places"));
router.use("/bookings", cors(corsData), require("./booking"));
router.get("/profile", cors(corsData), homeController.profile);
router.post("/upload-by-link", cors(corsData), homeController.uploadByLink);
router.post(
  "/upload",
  cors(corsData),
  photosMiddleware.array("photos", 100),
  homeController.upload
);

module.exports = router;
