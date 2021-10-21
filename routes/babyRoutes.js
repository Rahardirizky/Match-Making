const router = require('express').Router()
const BabyController  = require('../controllers/BabyController')

router.get('/', BabyController.getList)
router.get('/:id', (req, res) => res.send('babies by id page gan'))
router.get('/:id/chat', (req, res) => res.send('chat with babies page gan'))
router.get('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.post('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.get('/:id/dump', (req, res) => res.send('delete daddies by id page gan'))

module.exports = router