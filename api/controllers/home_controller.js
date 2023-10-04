const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const imageDownloader = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const photosMiddleware = multer({ dest: "/tmp" });
const bucket = "rahul-booking-app";
const mongoose = require("mongoose");
const mime = require("mime-types");

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

module.exports.profile = (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

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
    dest: "/tmp/" + newName,
    // dest: __dirname + "/uploads/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
};

//
module.exports.upload = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const uploadedFiles = [];
  for (let file of req.files) {
    const { path, originalname, mimetype } = file;

    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
    // const parts = originalname.split(".");
    // const ext = parts[parts.length - 1];
    // const newPath = path;
    // fs.renameSync(path, newPath);
    // uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
};
