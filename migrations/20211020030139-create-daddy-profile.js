'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DaddyProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      shortBio: {
        type: Sequelize.TEXT
      },
      monthlyBudget: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      gpsLocation: {
        type: Sequelize.STRING
      },
      DaddyId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'Daddies'
          }, key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DaddyProfiles');
  }
};