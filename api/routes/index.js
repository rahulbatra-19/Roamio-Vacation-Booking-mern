const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.use("/user", require("./users"));
router.use("/places", require("./places"));
router.use("/bookings", require("./booking"));
router.get("/profile", homeController.profile);
router.post("/upload-by-link", homeController.uploadByLink);
router.post("/upload", homeController.upload);


module.exports = router;
