const router = require('express').Router()
const rideController = require('../controllers/rides')
const cabController = require('../controllers/cabs')

router.get('/', cabController.getCabs)
router.post('/', rideController.newRide)
router.patch('/:id/start', rideController.startRide)
router.patch('/:id/end', rideController.endRide)
router.patch('/:id/cancel', rideController.cancelRide)

module.exports = router
