const express = require("express");
const router = express.Router();
const ShopControllers = require("./ShopControllers");
const passport = require("passport");

router.post(
  "/cate/add",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.addCategory
);
router.post(
  "/cate/update/:cate_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.updateCategory
);
router.get("/cate/list", ShopControllers.getListCate);
// @route       api/shop
module.exports = router;
