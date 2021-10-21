'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Daddy extends Model {
    static associate(models) {
      Daddy.hasOne(models.DaddyProfile)
      Daddy.belongsToMany(models.Baby, {
        through: "DaddyBabies",
        as: "Babies",
        foreignKey: "DaddyId",
      });
    }
  };
  Daddy.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    membershipLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Daddy',
    hooks: {
      beforeCreate(attributes) {
        attributes.password = hashPassword(attributes.password)
        if(!attributes.membershipLevel) attributes.membershipLevel = 'Basic'
      }
    }
  });
  return Daddy;
};