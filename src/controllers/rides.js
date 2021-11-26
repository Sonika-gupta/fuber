const rideModel = require('../models/rides')
const userModel = require('../models/users')
const cabModel = require('../models/cabs')
const { rideStatus, userStatus, errors } = require('../globals')

function getResult (res, method, params) {
  console.log('getting results for', method)
  const [error, result] = method(params)
  if (error) {
    console.log(error)
    res.status(500).send(error)
  } else return result
}

function newRide (req, res) {
  const { source, destination, user, requestPink = false } = req.body
  console.log(requestPink)
  const cab = getResult(res, cabModel.readClosestCab, {
    location: source,
    requestPink
  })
  Object.assign(
    user,
    getResult(res, userModel.updateUser, {
      id: user.id,
      status: userStatus.waiting
    })
  )
  Object.assign(
    cab,
    getResult(res, cabModel.updateCab, {
      id: cab.id,
      isBooked: true
    })
  )
  const ride = getResult(res, rideModel.createRide, {
    source,
    destination,
    user,
    cab
  })
  console.log(ride)
  res.send(ride)
}

function startRide (req, res) {
  const ride = getResult(res, rideModel.updateRide, {
    id: +req.params.id,
    status: rideStatus.started,
    startTime: Date.now()
  })
  const user = getResult(res, userModel.updateUser, {
    id: ride.userId,
    status: userStatus.riding
  })
  const cab = getResult(res, cabModel.updateCab, {
    id: ride.cab.id,
    currentRideId: ride.id
  })
  res.send(ride)
}

function endRide (req, res) {
  const ride = getResult(res, rideModel.updateRide, {
    id: +req.params.id,
    status: rideStatus.completed,
    endTime: Date.now()
  })
  const user = getResult(res, userModel.updateUser, {
    id: ride.userId,
    status: userStatus.idle
  })
  const cab = getResult(res, cabModel.updateCab, {
    id: ride.cab.id,
    isBooked: false,
    currentRideId: null,
    lat: ride.destination.lat,
    lon: ride.destination.lon
  })
  res.send(ride.getReceipt())
}

function cancelRide (req, res) {
  const ride = getResult(res, rideModel.updateRide, {
    id: +req.params.id,
    status: rideStatus.cancelled
  })
  const user = getResult(res, userModel.updateUser, {
    id: ride.userId,
    status: userStatus.idle
  })
  const cab = getResult(res, cabModel.updateCab, {
    id: ride.cab.id,
    isBooked: false,
    currentRideId: null
  })
  res.send(ride)
}

module.exports = {
  newRide,
  startRide,
  endRide,
  cancelRide
}
