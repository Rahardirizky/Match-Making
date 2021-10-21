'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = require('../data/babyProfile.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('BabyProfiles', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BabyProfiles', null, {});
  }
};

