const express = require("express");
const { postLogin, postUser, getTransaction, addTransaction } = require("../controllers/user");
const router = express.Router();

router.post("/login", postLogin);
router.post("/user", postUser);

router.get("/transaction/:userId", getTransaction);
router.post("/transaction", addTransaction);

module.exports = router;
