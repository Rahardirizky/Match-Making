'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BabyProfile extends Model {
    static associate(models) {
      BabyProfile.belongsTo(models.Baby)
    }
    get getFullName (){
      return `${this.firstName} ${this.lastName}`
    }
  };
  BabyProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
      get(field){
        const value = this.getDataValue(field)
        const today = new Date()
        const date = new Date(value)
        return today.getFullYear() - date.getFullYear()
      }
    },
    gender: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    expectedMonthlyAllowance: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    BabyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BabyProfile',
  });
  return BabyProfile;
};