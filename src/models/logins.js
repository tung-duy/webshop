"use strict";
module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define(
    "logins",
    {
      customer_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Logins.associate = function(models) {
    // associations can be defined here
  };
  return Logins;
};
