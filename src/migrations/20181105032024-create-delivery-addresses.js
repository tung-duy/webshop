"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("delivery_addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      forename: {
        type: Sequelize.STRING,
        allowNull: true
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      add1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      add2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      add3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postcode: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 10000
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("delivery_addresses");
  }
};
