'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = require('../data/location.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Locations', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};

