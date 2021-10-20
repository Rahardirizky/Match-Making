'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DaddyBabies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SugarDaddyId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'Daddies'
          }, key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      SugarBabyId: {
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
    await queryInterface.dropTable('DaddyBabies');
  }
};