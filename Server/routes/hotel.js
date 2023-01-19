const express = require("express");
const { getHotelByRegion, postSearchHotel } = require("../controllers/hotel");
const router = express.Router();

router.get("/hotelByRegion", getHotelByRegion);
router.get("/hotelByType");
router.get("/hotelByRating");

router.post("/searchHotel", postSearchHotel);


module.exports = router;