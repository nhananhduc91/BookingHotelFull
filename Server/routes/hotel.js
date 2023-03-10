const express = require("express");
const { getHotelByRegion, postSearchHotel, getHotelDetail } = require("../controllers/hotel");
const router = express.Router();

router.get("/hotelByRegion", getHotelByRegion);
router.get("/hotelByType");
router.get("/hotelByRating");

router.post("/searchHotel", postSearchHotel);

router.post("/hotel/:hotelId", getHotelDetail);



module.exports = router;