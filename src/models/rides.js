const { rides } = require('../../data')
const { Ride } = require('../classes/Ride')
const { rideStatus, errors } = require('../globals')

function createRide ({ source, destination, user, cab }) {
  try {
    if (!cab) throw Error(errors.undefinedCabId)
    if (!user) throw Error(errors.undefinedUserId)
    if (!source) throw Error(errors.sourceRequired)
    if (!destination) throw Error(errors.destinationRequired)
    const ride = new Ride({
      userId: user.id,
      cab,
      source,
      destination
    })
    rides.push(ride)
    return [null, ride]
  } catch (err) {
    return [err.message, null]
  }
}

function updateRide (ride) {
  try {
    if (!ride.id) throw Error(errors.undefinedRideId)

    const i = rides.findIndex(entry => entry.id == ride.id)
    if (i === -1) throw Error(errors.rideIdNotFound)

    checkState(rides[i], ride)

    ride = Object.assign(rides[i], ride)
    return [null, ride]
  } catch (err) {
    return [err.message, null]
  }
}

function checkState (current, update) {
  if (current.status === rideStatus.cancelled) throw Error(errors.rideNotActive)

  if (update.status === current.status) {
    if (current.status === rideStatus.started) throw Error(errors.rideOngoing)
    else if (current.status === rideStatus.completed)
      throw Error(errors.rideCompleted)
  }

  if (
    update.status === rideStatus.cancelled &&
    current.status != rideStatus.accepted
  )
    throw Error(errors.cannotCancelRide)
}

module.exports = {
  createRide,
  updateRide
}
