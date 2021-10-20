'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaddyProfile extends Model {
    static associate(models) {
      DaddyProfile.belongsTo(models.Daddy)
    }
  };
  DaddyProfile.init({
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
    monthlyBudget: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    DaddyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaddyProfile',
  });
  return DaddyProfile;
};