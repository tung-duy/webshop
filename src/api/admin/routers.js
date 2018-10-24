const express = require("express");
const router = express.Router();
const AdminControllers = require("./AdminControllers");

router.post("/register", AdminControllers.register);

router.post("/login", AdminControllers.login);

//@route     api/admin
module.exports = router;
