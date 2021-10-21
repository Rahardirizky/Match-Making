const router = require('express').Router()
const BabyController  = require('../controllers/BabyController')

router.get('/', BabyController.getBabyList)
router.get('/:id', BabyController.findBaby)
router.get('/:id/chat', BabyController.chat)
router.get('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.post('/:id/book', (req, res) => res.send('add daddies by id page gan'))
router.get('/:id/dump', (req, res) => res.send('delete daddies by id page gan'))

module.exports = router