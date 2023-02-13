const express = require("express");
const { getAllTransactions, getAllUsers, postAddHotel, getAllHotels, postAddRoom, getAllRooms, postDeleteHotel, postDeleteRoom, postUpdateHotel, postUpdateRoom, getHotelDetail, getRoomDetail } = require("../controllers/admin");
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get("/transactions", isAuth, getAllTransactions);
router.get("/users", getAllUsers);
router.get("/hotels", getAllHotels);
router.get("/rooms", getAllRooms);
router.get("/hotel/:hotelId", getHotelDetail);
router.get("/room/:roomId", getRoomDetail);



router.post("/addHotel", postAddHotel);
router.post("/addRoom", postAddRoom);

router.post("/deleteHotel", postDeleteHotel);
router.post("/deleteRoom", postDeleteRoom);

router.post("/updateHotel", postUpdateHotel);
router.post("/updateRoom", postUpdateRoom);

module.exports = router;