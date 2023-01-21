const express = require("express");
const { postLogin, postUser, postTransaction, getTransaction, addTransaction } = require("../controllers/user");
const router = express.Router();

router.post("/login", postLogin);
router.post("/user", postUser);

router.get("/transaction/:userName", getTransaction);
router.post("/transaction", addTransaction);

module.exports = router;
