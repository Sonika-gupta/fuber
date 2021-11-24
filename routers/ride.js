const router = require('express').Router()
const controller = require('../controllers/ride')

router.get('/find', controller.find)
router.post('/book', controller.book)

module.exports = router
