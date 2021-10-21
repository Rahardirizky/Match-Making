'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BabyProfile extends Model {
    static associate(models) {
      BabyProfile.belongsTo(models.Baby)
      BabyProfile.belongsTo(models.Location)
    }
    get getFullName (){
      return `${this.firstName} ${this.lastName}`
    }
    get birthday() {
      const ultah = new Date(this.dateOfBirth)
      return ultah.toISOString().substr(0, 10)
    }
    get age() {
        const today = new Date()
        const date = new Date(this.dateOfBirth)
        return today.getFullYear() - date.getFullYear()
    }
  };
  BabyProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    gender: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    expectedMonthlyAllowance: DataTypes.STRING,
    gpsLocation: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    BabyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BabyProfile',
  });
  return BabyProfile;
};