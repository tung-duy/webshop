"use strict";
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      customer_id: DataTypes.INTEGER,
      registered: DataTypes.BOOLEAN,
      delivery_add_id: DataTypes.INTEGER,
      payment_type: DataTypes.STRING,
      date: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      session: DataTypes.STRING,
      total: DataTypes.INTEGER
    },
    {}
  );
  Orders.associate = function(models) {
    // associations can be defined here
  };
  return Orders;
};
