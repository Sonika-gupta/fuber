const { rides } = require('../../data')
const { Ride } = require('../classes/Ride')
const { rideStatus, errors } = require('../globals')

function createRide ({ source, destination, user, cab }) {
  try {
    if (!cab) throw Error(errors.undefinedCabId)
    if (!user) throw Error(errors.undefinedUserId)
    if (!source) throw Error(errors.sourceRequired)
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
  console.log(ride)
  try {
    if (!ride.id) throw Error(errors.undefinedRideId)

    const i = rides.findIndex(entry => entry.id == ride.id)
    if (i === -1) throw Error(errors.rideIdNotFound)

    if (rides[i].status === rideStatus.cancelled)
      throw Error(errors.rideNotActive)

    if (ride.status === rides[i].status) {
      if (rides[i].status === rideStatus.started)
        throw Error(errors.rideOngoing)
      else if (rides[i].status === rideStatus.completed)
        throw Error(errors.rideCompleted)
    }

    if (
      ride.status === rideStatus.cancelled &&
      rides[i].status != rideStatus.accepted
    )
      throw Error(errors.cannotCancelRide)

    ride = Object.assign(rides[i], ride)
    return [null, ride]
  } catch (err) {
    return [err.message, null]
  }
}

module.exports = {
  createRide,
  updateRide
}
