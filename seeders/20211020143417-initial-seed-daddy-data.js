'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dataDaddies = require('../data/daddy.json')
    dataDaddies.forEach((daddy) => {
      (daddy.createdAt = new Date()), (daddy.updatedAt = new Date());
    });
    return queryInterface.bulkInsert("Daddies", dataDaddies, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Daddies", null, {});
  }
};
