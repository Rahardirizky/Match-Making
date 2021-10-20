'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaddyProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DaddyProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    monthlyBudget: DataTypes.STRING,
    location: DataTypes.STRING,
    DaddyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaddyProfile',
  });
  return DaddyProfile;
};