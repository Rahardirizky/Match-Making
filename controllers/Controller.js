const {
  DaddyProfile,
  Daddy,
  Baby,
  Location,
  DaddyBaby,
  BabyProfile,
} = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const e = require("express");
const { Op } = require("sequelize");

class Controller {
  static register(req, res) {
    const { username, password, email, userType, membershipLevel } = req.body;
    const foundUser = username;

    Daddy.findOne({ where: { email } })
      .then((daddy) => {
        if (daddy) {
          res.send(
            "Username already taken. Please register with a different one."
          );
        } else return Baby.findOne({ where: { email } });
      })
      .then((baby) => {
        if (baby) {
          res.send(
            "Username already taken. Please register with a different one."
          );
        } else {
          if (userType === "Daddy") {
            return Daddy.create({
              username,
              password,
              email,
              userType,
              membershipLevel,
            });
          } else {
            return Baby.create({
              username,
              password,
              email,
              userType,
              membershipLevel,
            });
          }
        }
      })
      .then(() => {
        if (userType === "Daddy") {
          req.session.hasLogin = "Daddy";
        } else {
          req.session.hasLogin = "Baby";
        }
        res.redirect(`/profile/${foundUser}`);
      })
      .catch((err) => res.render(err));
  }

  static login(req, res) {
    const { credentials, password } = req.body;
    Daddy.findOne({
      where: { [Op.or]: [{ email: credentials }, { username: credentials }] },
    })
      .then((daddy) => {
        if (daddy && comparePassword(password, daddy.password)) {
          req.session.hasLogin = "Daddy";
          const foundUser = daddy.username;
          res.redirect(`/profile/${foundUser}`);
        } else
          return Baby.findOne({
            where: {
              [Op.or]: [{ email: credentials }, { username: credentials }],
            },
          });
      })
      .then((baby) => {
        if (baby && comparePassword(password, baby.password)) {
          req.session.hasLogin = "Baby";
          res.redirect(`/daddies`);
        } else {
          res.send("email or password is incorrect");
        }
      })
      .catch((err) => res.render(err));
  }
  static showUserProfile(req, res) {
    const username = req.params.username;
    Daddy.findOne({
      where: { username },
      include: [ 
        { model: DaddyProfile, as: userProfile, include :[ {model: Location} ]}
      ]})
      .then((user) => {
        console.log(user);
        if (user) res.render("profile", { user });
        else {
          return Baby.findOne({
            where: { username },
            include: { all: true, nested: true },
          });
        }
      })
      .then((user) => {
        if (user) res.render("profile", { user });
      })
      .catch((err) => res.render(err));
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = Controller;
