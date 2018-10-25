const express = require("express");
const router = express.Router();
const ShopControllers = require("./ShopControllers");
const passport = require("passport");
const upload = require("../../../lib/upload");

// Router categories
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
router.delete(
  "/cate/delete/:cate_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.deleteCate
);

// Router products
router.post(
  "/prod/add",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopControllers.addProduct
);
router.post(
  "/prod/update/:prod_id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopControllers.updateProduct
);
router.get("/prod/all", ShopControllers.getListProducts);
router.get("/prod/:prod_id", ShopControllers.getProduct);
router.get("/prod/cate/:cate_id", ShopControllers.getProdByCate);
router.delete(
  "/prod/delete/:prod_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.deleteProduct
);

// @route       api/shop
module.exports = router;
