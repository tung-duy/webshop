const Sequelize = require("sequelize");
const sequelize = require("../../../lib/connect");

const Categories = sequelize.define("categories", {
  name: Sequelize.STRING,
  description: { type: Sequelize.TEXT, allowNull: true }
});

const Products = sequelize.define("products", {
  cat_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.STRING,
  price: Sequelize.INTEGER
});

Products.belongsTo(Categories, { foreignKey: "cate_id" });

const start = async () => {
  await sequelize.sync();
};
// start();
module.exports = {
  Categories,
  Products
};
