const { BabyProfile, Daddy, Baby, Location } = require('../models/index')

class BabyController {
  static getList(req, res) {
    BabyProfile.findAll({
      include: [Baby, Location]
    })
      .then(data => {
        console.log(data);
        res.render('babies', {babies : data})
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BabyController