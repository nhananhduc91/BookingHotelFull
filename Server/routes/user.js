const express = require("express");
const { getUsers, postUser } = require("../controllers/user");
const router = express.Router();

router.get("/user", getUsers);
router.post("/user", postUser);

module.exports = router;
