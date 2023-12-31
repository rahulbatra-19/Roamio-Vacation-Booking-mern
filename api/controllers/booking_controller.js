const BookingModel = require("../models/Booking");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}
module.exports.createBooking = (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { user, place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  BookingModel.create({
    ownerBooking: user,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  })
    .then((booking) => {
      res.json(booking);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getBookings = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const userData = await getUserDataFromToken(req);
  res.json(
    await BookingModel.find({ ownerBooking: userData.id }).populate("place")
  );
};

module.exports.getBookingById = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { id } = req.params;
  res.json(await BookingModel.findById(id).populate("place"));
};
