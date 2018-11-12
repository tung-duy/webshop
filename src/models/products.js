"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Categories);
  };
  return Products;
};
