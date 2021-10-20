'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaddyBaby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DaddyBaby.init({
    SugarDaddyId: DataTypes.INTEGER,
    SugarBabyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaddyBaby',
  });
  return DaddyBaby;
};