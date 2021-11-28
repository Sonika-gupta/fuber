const {
  cabs: cabModel,
  rides: rideModel,
  users: userModel
} = require('../models')

const { rideStatus, userStatus, errors } = require('../globals')

function getResult (res, method, params) {
  console.log(method)
  const [error, result] = method(params)
  if (error) {
    res
      .status(error.status || 500)
      .send({ error: { ...error, message: error.message } })
    return null
  } else {
    console.log(result)
    return result
  }
}

function newRide (req, res) {
  const { source, destination, user, requestPink = false } = req.body
  const cab = getResult(res, cabModel.readClosestCab, {
    location: source,
    requestPink
  })
  const ride =
    cab &&
    getResult(res, rideModel.createRide, {
      source,
      destination,
      user,
      cab
    })
  ride &&
    Object.assign(
      user,
      getResult(res, userModel.updateUser, {
        id: user.id,
        status: userStatus.waiting
      })
    )
  ride &&
    Object.assign(
      cab,
      getResult(res, cabModel.updateCab, {
        id: cab.id,
        isBooked: true,
        currentRideId: ride.id
      })
    )
  res.status(201).send(ride)
}

function startRide (req, res) {
  const ride = getResult(res, rideModel.updateRide, {
    id: +req.params.id,
    status: rideStatus.started,
    startTime: Date.now()
  })
  const user =
    ride &&
    getResult(res, userModel.updateUser, {
      id: ride.userId,
      status: userStatus.riding
    })
  const cab =
    ride &&
    getResult(res, cabModel.updateCab, {
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
  const user =
    ride &&
    getResult(res, userModel.updateUser, {
      id: ride.userId,
      status: userStatus.idle
    })
  const cab =
    ride &&
    getResult(res, cabModel.updateCab, {
      id: ride.cab.id,
      isBooked: false,
      currentRideId: null,
      lat: ride.destination.lat,
      lon: ride.destination.lon
    })
  res.send({ ...ride, receipt: ride.getReceipt() })
}

function cancelRide (req, res) {
  const ride = getResult(res, rideModel.updateRide, {
    id: +req.params.id,
    status: rideStatus.cancelled
  })
  const user =
    ride &&
    getResult(res, userModel.updateUser, {
      id: ride.userId,
      status: userStatus.idle
    })
  const cab =
    ride &&
    getResult(res, cabModel.updateCab, {
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
