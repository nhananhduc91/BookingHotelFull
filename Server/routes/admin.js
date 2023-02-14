const express = require("express");
const { getAllTransactions, getAllUsers, postAddHotel, getAllHotels, postAddRoom, getAllRooms, postDeleteHotel, postDeleteRoom, postUpdateHotel, postUpdateRoom, getHotelDetail, getRoomDetail, getPaginationTransactions } = require("../controllers/admin");
const router = express.Router();
const isAuth = require('../middleware/admin-auth');

router.get("/transactions", isAuth, getAllTransactions);
router.get("/transactions/:page", isAuth, getPaginationTransactions);
router.get("/users", isAuth, getAllUsers);
router.get("/hotels", isAuth, getAllHotels);
router.get("/rooms", isAuth, getAllRooms);
router.get("/hotel/:hotelId", isAuth, getHotelDetail);
router.get("/room/:roomId", isAuth, getRoomDetail);

router.post("/addHotel", isAuth, postAddHotel);
router.post("/addRoom", isAuth, postAddRoom);

router.post("/deleteHotel", isAuth, postDeleteHotel);
router.post("/deleteRoom", isAuth, postDeleteRoom);

router.post("/updateHotel", isAuth, postUpdateHotel);
router.post("/updateRoom", isAuth, postUpdateRoom);

module.exports = router;