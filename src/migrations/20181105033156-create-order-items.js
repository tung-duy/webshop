"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint("order_items", ["order_id"], {
      type: "foreign key",
      name: "fk_order_items_order_id_products",
      references: {
        table: "products",
        field: "id"
      },
      onDelete: "cascade"
    });
    await queryInterface.addConstraint("order_items", ["product_id"], {
      type: "foreign key",
      name: "fk_order_items_product_id_products",
      references: {
        table: "products",
        field: "id"
      },
      onDelete: "cascade"
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("order_items");
  }
};
