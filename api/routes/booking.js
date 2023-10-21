const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking_controller");
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app",
};

router.post("/", cors(corsData), bookingController.createBooking);
router.get("/", cors(corsData), bookingController.getBookings);
router.get("/:id", cors(corsData), bookingController.getBookingById);

module.exports = router;
