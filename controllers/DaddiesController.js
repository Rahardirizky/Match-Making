const currencyConverter = require("../helpers/currency");
const { DaddyProfile, Daddy, Baby, Location, DaddyBaby, BabyProfile } = require("../models/index");

class DaddyController {
  static getDaddyList(req, res) {
    console.log(req.session);
    DaddyProfile.findAll({
      include: [
        {model: Daddy, required: true },
        {model: Location,required: true},
      ],
    })
      .then((data) => {
        console.log(data);
        res.render("daddies", { daddies: data, currencyConverter });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  
  static findDaddy(req, res){
    let DaddyId = req.params.id
    let daddy
    DaddyProfile.findByPk(DaddyId, {
      include: [
        {model: Daddy, required: true},
        {model: Location,required: true},
      ],
      // include: [
      //   {model: DaddyProfile, required: true ,
      //     include: [{model: Location,required: true}]},
      // ],
    })
    .then((data) => {
      daddy = data
      return DaddyBaby.findAll({
        where: {
          DaddyId: daddy.Daddy.id
        },
        include: [{
          model: Baby,
          as: 'baby',
          include: [BabyProfile]
        }]
      }) 
    })
    .then(babies => {
      res.render("daddyDetail", { daddy, babies, currencyConverter });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }

  static chat(req, res) {
    const receiver = {
      userType: 'Daddy',
      id: req.params.id
    }
    res.render('daddyChat', {
      sender: req.session.user,
      receiver
    })
  }
}

module.exports = DaddyController;
