const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking_controller");
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app",
};

router.post("/",  bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);

module.exports = router;
