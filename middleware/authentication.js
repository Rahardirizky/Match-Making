
function authentication(req, res, next) {
  const hasLogin = req.session.hasLogin
  if(hasLogin) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = authentication

