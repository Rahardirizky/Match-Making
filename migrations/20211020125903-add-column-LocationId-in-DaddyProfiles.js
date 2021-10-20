'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DaddyProfiles', 'LocationId', 
    {
      type: Sequelize.INTEGER,
      references: {model: {tableName: "Locations"}, key: "id"},
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DaddyProfiles', 'LocationId',{})
  }
};
