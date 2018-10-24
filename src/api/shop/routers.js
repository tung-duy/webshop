const express = require("express");
const router = express.Router();
const ProductControllers = require("./ShopControllers");
const passport = require("passport");

router.post(
  "/cate/add",
  passport.authenticate("jwt", { session: false }),
  ProductControllers.addCategory
);

// @route       api/shop
module.exports = router;
