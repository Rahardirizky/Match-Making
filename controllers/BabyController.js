const currencyConverter = require("../helpers/currency");
const { BabyProfile, Daddy, Baby, Location } = require("../models/index");

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
    let babyId = req.params.id
    Baby.findByPk(babyId, {
      include: [
        {model: BabyProfile, required: true ,
          include: [{model: Location,required: true}]},
      ],
    })
    .then((baby) => {
      console.log(baby);
      res.render("babyDetail", { baby, currencyConverter });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}

module.exports = BabyController;
