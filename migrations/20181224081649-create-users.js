'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_passwordhash: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_familyname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_phonenumber: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      user_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_status: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      reset_password_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      active_account_token : {
        allowNull: true,
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};