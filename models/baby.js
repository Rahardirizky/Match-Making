'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Baby extends Model {
    static associate(models) {
      Baby.hasOne(models.BabyProfile)
      Baby.belongsToMany(models.Daddy, {
        through: "DaddyBabies",
        as: "Daddies",
        foreignKey: "BabyId",
      });
    }
  };
  Baby.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    membershipLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Baby',
  });
  return Baby;
};