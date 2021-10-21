const { BabyProfile, Daddy, Baby, Location } = require('../models/index')

class BabyController {
  static getList(req, res) {
    BabyProfile.findAll({
      include: [{
        model: Baby,
        required: true
      }, {
        model: Location,
        required: true
      }]
    })
      .then(data => {
        console.log(data);
        res.render('babies', {babies : data})
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = BabyController