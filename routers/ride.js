const router = require('express').Router()
const controller = require('../controllers/ride')

router.get('/find', controller.findRide)
router.post('/book', controller.bookRide)

module.exports = router
