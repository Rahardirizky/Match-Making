const router = require('express').Router()
// const routerEmployee = require('./employee')
// const routerStore = require('./store')

router.get('/', (req, res) => res.send('landing page gan'))

// router.use("/stores", routerStore)
// router.use("/employees", routerEmployee)

module.exports = router

/**
 * LIST UNTUK ROUTES GAN
 * 1. routes ke home
 * 2. login routes
 * 3. 
 */