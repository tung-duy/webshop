const path = require("path");
const { _basepath } = require("../server");

module.exports = {
  PORT: process.env.PORT || "4000",
  VIEWS: path.join(_basepath, "template"),
  viewEngine: "ejs",
  SecretOrKey: "Tùng Duy Developer",
  host: "localhost",
  dialect: "postgres",
  database: "webshop",
  username: "postgres",
  password: "tungduy"
};
