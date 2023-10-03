const User = require("../models/User");
const Place = require("../models/Place");
const bcrypt = require("bcryptjs");
const bcrpytSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrpytSalt),
    });
    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { maxAge: 13 * 60 * 60 * 1000 })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("Pass not ok");
    }
  } else {
    res.json("Not Found");
  }
};
module.exports.logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports.UserPlaces = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
};
