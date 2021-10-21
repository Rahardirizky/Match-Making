const router = require('express').Router()
const DaddyController = require('../controllers/DaddiesController')

router.get('/', DaddyController.getDaddyList)
router.get('/:id', DaddyController.findDaddy)
router.get('/:id/chat', DaddyController.chat)
router.get('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.post('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.get('/:id/dump', (req, res) => res.send('delete daddies by id page gan'))

module.exports = router