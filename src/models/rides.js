const { rides } = require('../../data')
const { Ride, UserError } = require('../classes')
const { rideStatus, errors } = require('../globals')

function createRide ({ source, destination, user, cab }) {
  try {
    if (!cab) throw new UserError(errors.undefinedCabId)
    if (!user) throw new UserError(errors.undefinedUserId)
    if (!source) throw new UserError(errors.sourceRequired)
    if (!destination) throw new UserError(errors.destinationRequired)
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
    if (!ride.id) throw new UserError(errors.undefinedRideId)

    const i = rides.findIndex(entry => entry.id == ride.id)
    if (i === -1) throw new UserError(errors.rideIdNotFound, 404)

    checkState(rides[i], ride)

    ride = Object.assign(rides[i], ride)
    return [null, ride]
  } catch (err) {
    return [err, null]
  }
}

function checkState (current, update) {
  if (current.status === rideStatus.cancelled)
    throw new UserError(errors.rideNotActive, 409)

  if (update.status === current.status) {
    if (current.status === rideStatus.started)
      throw new UserError(errors.rideOngoing, 409)
    else if (current.status === rideStatus.completed)
      throw new UserError(errors.rideCompleted, 409)
  }

  if (
    update.status === rideStatus.cancelled &&
    current.status != rideStatus.accepted
  )
    throw new UserError(errors.cannotCancelRide, 403)
}

module.exports = {
  createRide,
  updateRide
}
