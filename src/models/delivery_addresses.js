"use strict";
module.exports = (sequelize, DataTypes) => {
  const Delivery_addresses = sequelize.define(
    "delivery_addresses",
    {
      forename: DataTypes.STRING,
      surname: DataTypes.STRING,
      add1: DataTypes.STRING,
      add2: DataTypes.STRING,
      add3: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING
    },
    {}
  );
  Delivery_addresses.associate = function(models) {
    // associations can be defined here
  };
  return Delivery_addresses;
};
