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
    const foundUser = username

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
        console.log(user);
        if (userType === "Daddy") {
          req.session.user = user;
        } else {
          req.session.user = user;
        }
        res.redirect(`/profile/${foundUser}`);
      })
      .catch(err => res.render(err))
  }

  static login(req, res) {
    const { credentials, password } = req.body;
    console.log({credentials, password});
    Daddy.findOne({
      where: { [Op.or]: [{ email: credentials }, { username: credentials }] },
    })
      .then((daddy) => {
        if (daddy && comparePassword(password, daddy.password)) {
          req.session.user = daddy
          const foundUser = daddy.username
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
    const username = req.params.username
    console.log(username, '>>>username dari showuserprofile');
    Daddy.findOne({
      where: { username },
      include: [
        {
          model: DaddyBaby,
          include: [{ model: Baby }],
        },
        {
          model: DaddyProfile,
          include: [{ model: Location }],
        },
      ],
    })
      .then((userDaddy) => {
        if (userDaddy) res.render("profile", { userDaddy });
        else {
          return Baby.findOne({
            where: { username },
            include: [
              {
                model: DaddyBaby,
                include: [{ model: Daddy }],
              },
              {
                model: BabyProfile,
                include: [{ model: Location }],
              },
            ],
          });
        }
      })
      .then((userBaby) => {
        if (userBaby) res.render("profile", { userBaby });
      })
      .catch(err => res.render(err))
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = Controller;
