const express = require("express");
const router = express.Router();

// Controllers
const {
    createBurntToken,
    getAllBurntTokens,
    getUserBurntTokens
} = require("../controllers/Burn.controller");

router.route("/")
    .post(createBurntToken)
    .get(getAllBurntTokens);

router.route("/:userId").get(getUserBurntTokens);


module.exports = router;