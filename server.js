global._basepath = process.cwd();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./lib/config");

const admins = require("./src/api/admin/routers");
const shops = require("./src/api/shop/routers");
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

app.use("/api/admin", admins);
app.use("/api/shop", shops);

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
