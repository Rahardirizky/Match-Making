
function authentication(req, res, next) {
  const user = req.session.user
  if(user) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = authentication

