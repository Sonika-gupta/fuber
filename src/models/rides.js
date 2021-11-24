const { rides } = require('../../data')
const { Ride } = require('../classes/Ride')
const { updateUser } = require('./users')

function createRide ({ source, destination, user, cab }) {
  const ride = new Ride({
    userId: user.id,
    cabId: cab.id,
    source,
    destination
  })
  console.log(ride)
  rides.push(ride)
  return ride
}

function updateRide (ride) {
  if (!ride.id) throw Error('Need Ride ID')
  const i = rides.findIndex(entry => entry.id === ride.id)
  Object.assign(rides[i], ride)
  return ride
}

function startRide (id) {
  try {
    console.log(id)
    const ride = updateRide({ id, status: 'active', startTime: Date.now() })
    const user = updateUser({ id: ride.userId, status: 'riding' })
    return [null, ride]
  } catch (error) {
    return [error, null]
  }
}
module.exports = {
  createRide,
  startRide
}
