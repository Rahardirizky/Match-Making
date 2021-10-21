'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BabyProfiles', {
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
      expectedMonthlyAllowance: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      gpsLocation: {
        type: Sequelize.STRING
      },
      BabyId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'Babies'
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
    await queryInterface.dropTable('BabyProfiles');
  }
};