const express = require("express");
const { getAllTransactions, getAllUsers } = require("../controllers/admin");
const router = express.Router();

router.get("/transactions", getAllTransactions);
router.get("/users", getAllUsers);

module.exports = router;