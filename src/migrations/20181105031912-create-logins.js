"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("logins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
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
    await queryInterface.addConstraint("logins", ["customer_id"], {
      type: "foreign key",
      name: "fk_logins_customer_id_customers",
      references: {
        table: "customers",
        field: "id"
      },
      onDelete: "cascade"
    });
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint(
    //   "logins",
    //   "fk_logins_customer_id_customers"
    // );
    await queryInterface.dropTable("logins");
  }
};
