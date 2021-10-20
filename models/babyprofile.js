'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BabyProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BabyProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    expectedMonthlyAllowance: DataTypes.STRING,
    location: DataTypes.STRING,
    BabyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BabyProfile',
  });
  return BabyProfile;
};