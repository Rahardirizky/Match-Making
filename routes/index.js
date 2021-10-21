const router = require('express').Router()
const daddyRoutes = require('./daddyRoutes')
const babyRoutes = require('./babyRoutes')
const Controller = require('../controllers/Controller')
const e = require('express')

router.get('/', (req, res) => {
  if(req.session.hasLogin === 'Daddy') {
    res.redirect('/babies')
  } else if (req.session.hasLogin === 'Baby') {
    res.redirect('/daddies')
  }
  res.render('home')
})
router.get('/register', (req, res) => {
  if(req.session.hasLogin === 'Daddy') {
    res.redirect('/babies')
  } else if (req.session.hasLogin === 'Baby') {
    res.redirect('/daddies')
  }
  res.render('registration')
})
router.post('/register', Controller.register)
router.get('/login', (req, res) => {
  if(req.session.hasLogin === 'Daddy') {
    res.redirect('/babies')
  } else if (req.session.hasLogin === 'Baby') {
    res.redirect('/daddies')
  }
  res.render('login')
})
router.post('/login', Controller.login)
router.get('/logout', Controller.logout)
router.get('/profile', (req, res) => res.send('login page gan'))
router.get('/profile/edit', (req, res) => res.send('login page gan'))
router.post('/profile/edit', (req, res) => res.send('login page gan'))

router.use("/daddies", daddyRoutes)
router.use("/babies", babyRoutes)

module.exports = router

