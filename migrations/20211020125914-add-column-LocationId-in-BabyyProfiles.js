'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BabyProfiles', 'LocationId', {
      type: Sequelize.INTEGER,
      references: {
        model : {
          tableName : 'Locations'
        },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BabyProfiles', 'LocationId');
  }
};
