const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place_controller");
const cors = require("cors");
const corsData = {
  credentials: true,
  origin: "https://roamio-app.netlify.app",
};

router.post("/", placeController.addPlace);
router.get("/:id", placeController.getPlacebyId);
router.put("/", placeController.updatePlace);
router.get("/", placeController.getPlaces);

module.exports = router;
