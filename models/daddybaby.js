'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaddyBaby extends Model {
    static associate(models) {
      DaddyBaby.belongsTo(models.Baby, { 
        foreignKey: 'BabyId', 
        as: 'baby' 
      });
      DaddyBaby.belongsTo(models.Daddy, { 
        foreignKey: 'DaddyId', 
        as: 'daddy' 
      });
    }
  };
  DaddyBaby.init({
    BabyId: DataTypes.INTEGER,
    DaddyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaddyBaby',
  });
  return DaddyBaby;
};