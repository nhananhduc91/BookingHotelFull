const express = require("express");
const { getHotelByRegion } = require("../controllers/hotel");
const router = express.Router();

router.get("/hotelByRegion", getHotelByRegion);
router.get("/hotelByType");
router.get("/hotelByRating");

module.exports = router;