const router = require('express').Router()
const { rides: rideController, cabs: cabController } = require('../controllers')

router.get('/', cabController.getCabs)
router.post('/', rideController.newRide)
router.patch('/:id/start', rideController.startRide)
router.patch('/:id/end', rideController.endRide)
router.patch('/:id/cancel', rideController.cancelRide)

module.exports = router
