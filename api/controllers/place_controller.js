const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");

module.exports.addPlace = (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
};
module.exports.getPlacebyId = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { id } = req.params;
  res.json(await Place.findById(id));
};
module.exports.updatePlace = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const placeDoc = await Place.findById(id);

  placeDoc.set({
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });
  placeDoc.save();
  res.json("ok");
};

module.exports.getPlaces = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const placeDoc = await Place.find();
  res.json(placeDoc);
};
