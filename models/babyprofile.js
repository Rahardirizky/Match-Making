'use strict';
const {
  Model
} = require('sequelize');
const {Baby} = require('./baby')
const {Location} = require('./location')
const { Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BabyProfile extends Model {
    static associate(models) {
      BabyProfile.belongsTo(models.Baby)
      BabyProfile.belongsTo(models.Location)
    }
    get getFullName() {
      return `${this.firstName} ${this.lastName}`
    }
    get birthday() {
      const ultah = new Date(this.dateOfBirth)
      return ultah.toISOString().substr(0, 10)
    }
    get showAge() {
      const today = new Date()
      const date = new Date(this.dateOfBirth)
      return today.getFullYear() - date.getFullYear()
    }
    static getBabyByAllowance(allowance) {
      return new Promise((res, rej) => {
        let condition = allowance ? allowance : 0
        BabyProfile.findAll({ 
          where: { expectedMonthlyAllowance: { [Op.gte]: +condition } }, 
          order: [['expectedMonthlyAllowance', 'ASC']], 
          include:[Baby,Location] })
          .then((data) => res(data))
          .catch((err) => rej(err));
      })
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
    expectedMonthlyAllowance: DataTypes.INTEGER,
    gpsLocation: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    BabyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BabyProfile',
  });
  return BabyProfile;
};