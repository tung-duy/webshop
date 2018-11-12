"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      registered: {
        type: Sequelize.BOOLEAN
      },
      delivery_add_id: {
        type: Sequelize.INTEGER
      },
      payment_type: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      session: {
        type: Sequelize.STRING
      },
      total: {
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
    await queryInterface.addConstraint("orders", ["customer_id"], {
      type: "foreign key",
      name: "fk_orders_customer_id_customers",
      references: {
        table: "customers",
        field: "id"
      }
    });
    await queryInterface.addConstraint("orders", ["delivery_add_id"], {
      type: "foreign key",
      name: "fk_orders_delivery_add_id_delivery_addresses",
      references: {
        table: "delivery_addresses",
        field: "id"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint(
    //   "orders",
    //   "fk_orders_customer_id_customers"
    // );
    // await queryInterface.removeConstraint(
    //   "orders",
    //   "fk_orders_delivery_add_id_delivery_addresses"
    // );
    await queryInterface.dropTable("orders");
  }
};
