"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
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
        type: Sequelize.STRING
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
        allowNull: true
      },
      phone: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      registered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable("customers");
  }
};
