const express = require("express");
const router = express.Router();
const LoginControllers = require("./LoginControllers");

router.post("/register", LoginControllers.register);

router.post("/", LoginControllers.login);

//@route     api/login
module.exports = router;
