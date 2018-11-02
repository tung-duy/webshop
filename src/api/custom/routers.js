const express = require("express");
const router = express.Router();
const passport = require("passport");

const CustomController = require("./CustomControllers");

router.post("/register", CustomController.addUserCustom);
router.post(
  "/order",
  passport.authenticate("jwt", { session: false }),
  CustomController.createOrder
);
// @route        api/custom
module.exports = router;
