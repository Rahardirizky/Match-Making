'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = require('../data/baby.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
    })
    return queryInterface.bulkInsert('Babies', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Babies', null, {});
  }
};

