const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place_controller");
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app",
};



router.post("/", cors(corsData), placeController.addPlace);
router.get("/:id",cors(corsData) ,placeController.getPlacebyId);
router.put("/",cors(corsData) ,placeController.updatePlace);
router.get("/",cors(corsData) ,placeController.getPlaces);

module.exports = router;
