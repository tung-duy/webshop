const express = require("express");
const router = express.Router();
const AdminControllers = require("./AdminControllers");

router.post("/register", AdminControllers.register);

//@route     api/admin
module.exports = router;
