const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://roamio-app.netlify.app/",
  })
);
// mongoose.connect(process.env.MONGO_URL);
// using express Routes
app.use("/api", require("./routes"));
app.listen(process.env.PORT);
