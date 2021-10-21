'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BabyProfiles', 'location')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BabyProfiles', 'location', Sequelize.STRING)
  }
};

