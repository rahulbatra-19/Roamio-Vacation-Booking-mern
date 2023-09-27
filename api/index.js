const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });

  // try {
  //   const user = await User.create({
  //     name,
  //     email,
  //     password: bcrypt.hashSync(password, bcrpytSalt),
  //   });
  //   res.json(user);
  // } catch (error) {
  //   res.status(422).json(e);
  // }
});

app.listen(4000);
