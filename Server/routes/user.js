const express = require("express");
const { postLogin, postUser, getTransaction, addTransaction, checkAvailableRoom } = require("../controllers/user");
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post("/login", postLogin);
router.post("/user", postUser);

router.get("/transaction/:userId", isAuth, getTransaction);
router.post("/transaction", isAuth, addTransaction);

router.post("/checkAvailableRoom", isAuth, checkAvailableRoom)

module.exports = router;
