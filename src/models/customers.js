"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "customers",
    {
      forename: DataTypes.STRING,
      surname: DataTypes.STRING,
      add1: DataTypes.STRING,
      add2: DataTypes.STRING,
      add3: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      registered: DataTypes.BOOLEAN
    },
    {}
  );
  Customers.associate = function(models) {
    // associations can be defined here
  };
  return Customers;
};
