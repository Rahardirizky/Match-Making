const router = require('express').Router()
const daddyRoutes = require('./daddyRoutes')
const babyRoutes = require('./babyRoutes')

router.get('/', (req, res) => res.render('babyDetail'))
router.get('/register', (req, res) => res.send('register page gan'))
router.get('/login', (req, res) => res.send('login page gan'))
router.get('/profile', (req, res) => res.send('login page gan'))
router.get('/profile/edit', (req, res) => res.send('login page gan'))
router.post('/profile/edit', (req, res) => res.send('login page gan'))

router.use("/daddies", daddyRoutes)
router.use("/babies", babyRoutes)

module.exports = router