const { Baby, Daddy } = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt');
const e = require('express');

class Controller {
  static register(req, res) {
    const {username, password, email, userType, membershipLevel} = req.body
    console.log(req.body);

    Daddy.findOne({
      where: {
        email
      }
    })
      .then(daddy => {
        if(daddy) {
          res.send('User Already Exist')
        } else {
          return Baby.findOne({
            where: {
              email
            }
          })
        }
      })
      .then(baby => {
        if(baby) {
          res.send('User Already Exist')
        } else {
          if(userType === 'Daddy') {
            return Daddy.create({username, password, email, userType, membershipLevel})
          } else {
            return Baby.create({username, password, email, userType, membershipLevel})
          }
        }
      })
      .then(user => {
        if(userType === 'Daddy') {
          req.session.hasLogin = 'Daddy'
          res.redirect('/babies')
        } else {
          req.session.hasLogin = 'Baby'
          res.redirect('/daddies')
        }
      })
  }

  static login(req, res) {
    const {email, password} = req.body
    Daddy.findOne({
      where: {
        email
      }
    })
      .then(daddy => {
        if(daddy && comparePassword(password, daddy.password)) {
          req.session.hasLogin = 'Daddy'
          res.redirect('/babies')
        } else {
          return Baby.findOne({
            where: {
              email
            }
          })
        }
      }) 
      .then(baby => {
        if(baby && comparePassword(password, baby.password)) {
          req.session.hasLogin = 'Baby'
          res.redirect('/babies')
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