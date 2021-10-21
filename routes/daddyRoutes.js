const router = require('express').Router()
const {DaddiesController} = require('../controllers/DaddiesController')

router.get('/', (req, res) => res.send('list daddies page gan'))
router.get('/:id', (req, res) => res.send('daddies by id page gan'))
router.get('/:id/chat', (req, res) => res.send('chat with daddies by id page gan'))
router.get('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.post('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.get('/:id/dump', (req, res) => res.send('delete daddies by id page gan'))

module.exports = router