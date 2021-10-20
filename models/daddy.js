'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daddy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Daddy.init({
    usernamme: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    membershipLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Daddy',
  });
  return Daddy;
};