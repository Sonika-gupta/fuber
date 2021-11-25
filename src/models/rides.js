const { rides } = require('../../data')
const { Ride } = require('../classes/Ride')
const { rideStatus, errors } = require('../globals')

function createRide ({ source, destination, user, cab }) {
  try {
    const ride = new Ride({
      userId: user.id,
      cab,
      source,
      destination
    })
    rides.push(ride)
    return [null, ride]
  } catch (err) {
    return [err, null]
  }
}

function updateRide (ride) {
  try {
    if (!ride.id) throw Error(errors.undefinedRideId)

    const i = rides.findIndex(entry => entry.id == ride.id)
    if (i === -1) throw Error(errors.rideIdNotFound)

    if (ride.status === rideStatus.started && ride.startTime)
      throw Error(errors.rideOngoing)
    if (ride.status === rideStatus.completed && ride.endTime)
      throw Error(errors.rideCompleted)

    ride = Object.assign(rides[i], ride)
    return [null, ride]
  } catch (err) {
    return [{ error: err.message }, null]
  }
}

module.exports = {
  createRide,
  updateRide
}
