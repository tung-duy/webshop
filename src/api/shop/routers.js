const express = require("express");
const router = express.Router();
const ShopControllers = require("./ShopControllers");
const passport = require("passport");
const upload = require("../../../lib/upload");

// Router categories
router.post(
  "/categories/",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.addCategory
);
router.put(
  "/categories/:cate_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.updateCategory
);
router.get("/categories/", ShopControllers.getListCate);
router.delete(
  "/categories/:cate_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.deleteCate
);

// Router products
router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopControllers.addProduct
);
router.put(
  "/products/:prod_id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopControllers.updateProduct
);
router.get("/products", ShopControllers.getListProducts);
router.get("/products/:prod_id", ShopControllers.getProduct);
router.get("/products/category/:cate_id", ShopControllers.getProdByCate);
router.delete(
  "/product/delete/:prod_id",
  passport.authenticate("jwt", { session: false }),
  ShopControllers.deleteProduct
);

// @route       api/shop
module.exports = router;
