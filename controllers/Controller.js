const {
  DaddyProfile,
  Daddy,
  Baby,
  Location,
  DaddyBaby,
  BabyProfile
} = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const e = require("express");
const { Op } = require("sequelize");

class Controller {
  static register(req, res) {
    const { username, password, email, userType, membershipLevel } = req.body;

    Daddy.findOne({ where: { email } })
      .then((daddy) => {
        if (daddy) {
          res.send("Username already taken. Please register with a different one.");
        } else return Baby.findOne({ where: { email } });
      })
      .then((baby) => {
        if (baby) {
          res.send("Username already taken. Please register with a different one.");
        } else {
          if (userType === "Daddy") {
            return Daddy.create({ username, password, email, userType, membershipLevel });
          } else {
            return Baby.create({ username, password, email, userType, membershipLevel })
          }
        }
      })
      .then((user) => {

        if (userType === "Daddy") {
          req.session.user = user;
          req.session.username = username
          res.redirect('/babies');
        } else {
          req.session.user = user;
          req.session.username = username
          res.redirect('/daddies');
        }
        
      })
      .catch(err => res.render(err))
  }

  static login(req, res) {
    const { credentials, password } = req.body
    Daddy.findOne({
      where: { [Op.or]: [{ email: credentials }, { username: credentials }] },
    })
      .then((daddy) => {
        if (daddy && comparePassword(password, daddy.password)) {
          req.session.user = daddy
          res.redirect(`/babies`);
        } else
          return Baby.findOne({
            where: { [Op.or]: [{ email: credentials }, { username: credentials }] },
          });
      })
      .then((baby) => {
        if (baby && comparePassword(password, baby.password)) {
          req.session.user = baby
          res.redirect(`/daddies`);
        } else {
          res.send("email or password is incorrect");
        }
      })
      .catch(err => res.render(err))
  }
  static showUserProfile(req, res) {
    const username = req.session.username

    Daddy.findOne({
      where: { username },
      include: [
        { model: Daddy, required: true },
        { model: Location, required: true },
      ],
    })
      .then((user) => {
        if (user) {
          res.render("profile", { user })
        } else {
          return Baby.findOne({
            where: { username },
            include: [
              { model: Baby },
              { model: Location },
            ],
          })
        }
      })
      .then((user) => {
        res.render("profile", { user })
      })
      .catch(err => res.render(err))
  }
  static deleteUser(req, res) {
    const username = req.session.username
    const userType = req.session.user
    if (userType == 'daddy') {
      Daddy.destroy({ where: { username } })
        .then(() => {
          req.session.destroy();
          res.redirect("/")
        })
    } else if (userType == 'daddy') {
      Baby.destroy({ where: { username } })
        .then(() => {
          req.session.destroy();
          res.redirect("/")
        })
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = Controller;
