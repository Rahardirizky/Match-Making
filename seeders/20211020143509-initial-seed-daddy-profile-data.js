'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dataDaddyProfile = require('../data/daddyProfile.json')
    dataDaddyProfile.forEach((daddyProfile) => {
      (daddyProfile.createdAt = new Date()), (daddyProfile.updatedAt = new Date());
    });
    return queryInterface.bulkInsert("DaddyProfiles", dataDaddyProfile, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DaddyProfiles", null, {});
  }
};