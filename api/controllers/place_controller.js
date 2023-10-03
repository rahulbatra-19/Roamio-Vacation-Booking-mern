const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports.addPlace = (req, res) => {
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
  const { id } = req.params;
  res.json(await Place.findById(id));
};
module.exports.updatePlace = async (req, res) => {
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
  const placeDoc = await Place.find();
  res.json(placeDoc);
};
