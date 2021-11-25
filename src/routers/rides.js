const router = require('express').Router()
const rideController = require('../controllers/rides')
const cabController = require('../controllers/cabs')

router.get('/', cabController.getCabs)
router.get('/pink', cabController.getPinkCabs)
router.post('/', rideController.newRide)
router.patch('/start/:id', rideController.startRide)
router.patch('/end/:id', rideController.endRide)
router.patch('/cancel/:id', rideController.cancelRide)

module.exports = router
