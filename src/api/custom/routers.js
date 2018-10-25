const express = require("express");
const router = express.Router();

const CustomController = require("./CustomControllers");

router.post("/register", CustomController.addUserCustom);

// @route        api/custom
module.exports = router;
