const Sequelize = require("sequelize");
const sequelize = require("../../../lib/connect");

const Admins = sequelize.define("admins", {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// Admins.sync();
module.exports = Admins;
