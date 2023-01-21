const express = require("express");
const { getAllTransactions, getAllUsers, postAddHotel } = require("../controllers/admin");
const router = express.Router();

router.get("/transactions", getAllTransactions);
router.get("/users", getAllUsers);

router.post("/addHotel", postAddHotel);

module.exports = router;