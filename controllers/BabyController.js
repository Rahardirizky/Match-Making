const currencyConverter = require("../helpers/currency");
const {
  DaddyProfile,
  Daddy,
  Baby,
  Location,
  DaddyBaby,
  BabyProfile,
} = require("../models/index");

class BabyController {
  static getBabyList(req, res) {
    BabyProfile.findAll({
      include: { all: true, nested: true },
    })
      .then((data) => {
        res.render("babies", { babies: data, currencyConverter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static findBaby(req, res) {
    let BabyId = req.params.id;
    let baby;
    BabyProfile.findOne({
      where: { BabyId },
      include: [
        { model: Baby, required: true },
        { model: Location, required: true },
      ],
    })
      .then((data) => {
        baby = data;
        return DaddyBaby.findAll({
          where: { BabyId: baby.Baby.id },
          include: [
            {
              model: Daddy,
              as: "daddy",
              include: [DaddyProfile],
            },
          ],
        });
      })
      .then((daddies) => {
        res.render("babyDetail", { baby, daddies, currencyConverter });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static chat(req, res) {
    const receiver = {
      userType: 'Baby',
      id: req.params.id
    }
    res.render('babyChat', {
      sender: req.session.user,
      receiver
    })
  }
}

module.exports = BabyController;
