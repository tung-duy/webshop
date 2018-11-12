"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_items = sequelize.define(
    "order_items",
    {
      quantity: DataTypes.INTEGER
    },
    {}
  );
  Order_items.associate = function(models) {
    // associations can be defined here
  };
  return Order_items;
};
