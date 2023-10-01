const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, reqiured: true },
  phone: { type: String, reqiured: true },
  price: Number,
  numberOfGuests: Number,
  ownerBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
