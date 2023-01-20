const express = require("express");
const { getUsers, postUser, postTransaction } = require("../controllers/user");
const router = express.Router();

router.get("/user", getUsers);
router.post("/user", postUser);

router.post("/transaction", postTransaction);

module.exports = router;
