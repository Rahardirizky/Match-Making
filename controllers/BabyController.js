const { Baby, Daddy } = require('../models/index')

class BabyController {
  static getList(req, res) {
    Baby.findAll()
      .then(data => {
        res.render('babies', {babies : data})
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BabyController