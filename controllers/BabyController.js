const currencyConverter = require("../helpers/currency");
const daddybaby = require("../models/daddybaby");
const { DaddyProfile, Daddy, Baby, Location, DaddyBaby, BabyProfile } = require("../models/index");

class BabyController {
  static getBabyList(req, res) {
    BabyProfile.findAll({
      include: [
        {model: Baby, required: true },
        {model: Location,required: true},
      ],
    })
      .then((data) => {
        console.log(data);
        res.render("babies", { babies: data, currencyConverter });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  
  static findBaby(req, res){
    let BabyId = req.params.id
    let baby
    BabyProfile.findByPk(BabyId, {
      include: [
        {model: Baby, required: true },
        {model: Location,required: true},
      ],
      // include: [
      //   {model: BabyProfile, required: true ,
      //     include: [{model: Location,required: true}]},
      // ],
    })
    .then((data) => {
      baby = data
      return DaddyBaby.findAll({
        where: {
          BabyId: baby.Baby.id
        },
        include: [{
          model: Daddy,
          as: 'daddy',
          include: [DaddyProfile]
        }]
      })
    })
    .then(daddies => {
      res.render("babyDetail", { baby, daddies, currencyConverter });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}

module.exports = BabyController;
