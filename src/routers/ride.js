const router = require('express').Router()
const controller = require('../controllers/ride')

router.get('/find', controller.find)
router.post('/book', controller.book)
router.put('/start/:id', controller.start)

module.exports = router
