const Sequelize = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.DATABASE_URL);

module.exports = sequelize;
