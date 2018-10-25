global._basepath = process.cwd();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./lib/config");
const passport = require("passport");

const logins = require("./src/api/login/routers");
const shops = require("./src/api/shop/routers");
const customers = require("./src/api/custom/routers");

// Setting body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting static file
app.use(express.static("public"));

// Setting View EJS
app.set("views", config.VIEWS);
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("test");
});

// Passport initialize
app.use(passport.initialize());
// Passport configure
require("./lib/passport")(passport);

app.use("/api/login", logins);
app.use("/api/shop", shops);
app.use("/api/custom", customers);

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
