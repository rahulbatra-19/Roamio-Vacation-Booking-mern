const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const imageDownloader = require("image-downloader");
const multer = require("multer");
const photosMiddleware = multer({ dest: "uploads/" });

module.exports.profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(tokenData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json("no");
  }
};
module.exports.uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
};

(module.exports.upload = photosMiddleware.array("photos", 100)),
  (req, res) => {
    const uploadedFiles = [];
    for (let file of req.files) {
      const { path, originalname } = file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  };
