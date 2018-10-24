const express = require("express");
const router = express.Router();
const ProductControllers = require("./ShopControllers");

router.post("/cate/add", ProductControllers.addCategory);

// @route       api/shop
module.exports = router;
