'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.DaddyProfile)
      Location.hasMany(models.BabyProfile)
    }
  };
  Location.init({
    name: DataTypes.STRING,
    gpsLocation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};