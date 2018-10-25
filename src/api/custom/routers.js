const express = require("express");
const router = express.Router();

const CustomController = require("./CustomControllers");

router.post("/register", CustomController.addUserCustom);
router.post("/order/create", CustomController.createOrder);
// @route        api/custom
module.exports = router;
