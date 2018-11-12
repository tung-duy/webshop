const Sequelize = require("sequelize");
const sequelize = require("../../../lib/connect");

const { Products } = require("../shop/ShopModel");

const Logins = sequelize.define("logins", {
  customer_id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Customers = sequelize.define("customers", {
  forename: { type: Sequelize.STRING, allowNull: true },
  surname: { type: Sequelize.STRING, allowNull: true },
  add1: { type: Sequelize.STRING, allowNull: false },
  add2: { type: Sequelize.STRING, allowNull: true },
  add3: { type: Sequelize.STRING, allowNull: true },
  postcode: { type: Sequelize.INTEGER, allowNull: true },
  phone: Sequelize.INTEGER,
  email: Sequelize.STRING,
  registered: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false }
});

const Orders = sequelize.define("orders", {
  customer_id: Sequelize.INTEGER,
  registered: Sequelize.BOOLEAN,
  delivery_add_id: Sequelize.INTEGER,
  payment_type: Sequelize.STRING,
  date: Sequelize.DATE,
  status: Sequelize.BOOLEAN,
  session: Sequelize.STRING,
  total: Sequelize.INTEGER
});

const Order_items = sequelize.define("order_items", {
  quantity: Sequelize.INTEGER
});

const Delivery_addresses = sequelize.define("delivery_addresses", {
  forename: Sequelize.STRING,
  surname: Sequelize.STRING,
  add1: Sequelize.STRING,
  add2: { type: Sequelize.STRING, allowNull: true },
  add3: { type: Sequelize.STRING, allowNull: true },
  postcode: { type: Sequelize.INTEGER, allowNull: true },
  phone: Sequelize.INTEGER,
  email: Sequelize.STRING
});

Logins.belongsTo(Customers, { foreignKey: "customer_id" });
Orders.belongsTo(Customers, { foreignKey: "customer_id" });
Orders.belongsTo(Delivery_addresses, { foreignKey: "delivery_add_id" });
Order_items.belongsTo(Products);
Orders.hasMany(Order_items);
// Orders.belongsToMany(Products, { through: Order_items });
// Products.belongsToMany(Orders, { through: Order_items });

const start = async () => {
  await sequelize.sync({ force: true });
};
// start();
module.exports = {
  Logins,
  Customers,
  Orders,
  Delivery_addresses,
  Order_items
};
