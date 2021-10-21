const { Baby, Daddy } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt');
const e = require('express');
const { Op } = require('sequelize');
const { defaultValueSchemable } = require('sequelize/types/lib/utils');

class Controller {
  static register(req, res) {
    const { username, password, email, userType, membershipLevel } = req.body

    Daddy.findOne({ where: { email } })
      .then(daddy => {
        if (daddy) { res.send('Username already taken. Please register with a different one.') }
        else return Baby.findOne({ where: { email } })
      })
      .then(baby => {
        if (baby) { res.send('Username already taken. Please register with a different one.') }
        else {
          if (userType === 'Daddy') return Daddy.create({ username, password, email, userType, membershipLevel })
          else return Baby.create({ username, password, email, userType, membershipLevel })
        }
      })
      .then(() => {
        if (userType === 'Daddy') {
          req.session.hasLogin = 'Daddy'
        } else { req.session.hasLogin = 'Baby' }
        res.redirect('/profile')
      })
  }

  static login(req, res) {
    const { credentials, password } = req.body
    Daddy.findOne({ where: { [Op.or]: [{ email: credentials }, { username: credentials }] } })
      .then(daddy => {
        if (daddy && comparePassword(password, daddy.password)) {
          req.session.hasLogin = 'Daddy'
          res.redirect(`/profile/${daddy.username}`)
        } else return Baby.findOne({ where: { [Op.or]: [{ email: credentials }, { username: credentials }] } })
      })
      .then(baby => {
        if (baby && comparePassword(password, baby.password)) {
          req.session.hasLogin = 'Baby'
          res.redirect(`/profile/${baby.username}`)
        } else {
          res.send('email or password is incorrect')
        }
      })
  }
  static showUserProfile(req, res) {
    const { username } = req.params.username
    Daddy.findOne({
      where: { username },
      include: [
        {
          model: DaddyBaby, required: false, include: [
            { model: Baby, required: true }]
        },
        {
          model: DaddyProfile, required: true, include: [
            { model: Location, required: true }]
        }
      ]
    })
      .then(user => {
        res.render('profile', { user })
      } else return Baby.findOne({ where: { [Op.or]: [{ email: credentials }, { username: credentials }] } })
  }) 
      .then(baby => {
    if(baby && comparePassword(password, baby.password)) {
  req.session.hasLogin = 'Baby'
  res.redirect(`/profile/${baby.username}`)
} else {
  res.send('email or password is incorrect')
}
      })
  }
  static logout(req, res) {
  req.session.destroy()
  res.redirect('/')
}
}

module.exports = Controller