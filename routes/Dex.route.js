const express = require("express");
const router = express.Router();

// Controllers
/******* Users ******/
const {
    createUser,
    getUsers
} = require("../controllers/Dex.controller");

router.route("/users")
    .post(createUser)
    .get(getUsers);

module.exports = router;