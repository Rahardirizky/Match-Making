'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaddyProfile extends Model {
    static associate(models) {
      DaddyProfile.belongsTo(models.Daddy)
      DaddyProfile.belongsTo(models.Location)
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
  DaddyProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    gender: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    monthlyBudget: DataTypes.STRING,
    gpsLocation: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    DaddyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaddyProfile',
  });
  return DaddyProfile;
};