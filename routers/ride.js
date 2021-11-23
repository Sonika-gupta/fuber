const router = require('express').Router()
const controller = require('../controllers/ride')

router.get('/find', controller.findRide)

module.exports = router
