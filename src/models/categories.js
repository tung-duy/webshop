"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.hasMany(models.Products);
  };
  return Categories;
};
