'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DaddyProfiles', 'location')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DaddyProfiles', 'location', Sequelize.STRING)
  }
};
