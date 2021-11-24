const { cabs } = require('../../data')
const { errors } = require('../globals')
const { findDistance, findClosest } = require('../utils')
const { createRide } = require('./rides')
const { updateUser } = require('./users')

function updateCab (cab) {
  console.log('updating', cab)
  const i = cabs.findIndex(entry => entry.id === cab.id)
  Object.assign(cabs[i], cab)
  return cab
}

function getCabsInRadius ({ lat, lon }, radius) {
  return cabs.filter(
    cab =>
      !cab.isBooked &&
      Math.abs(cab.lat - lat) < 0.01 &&
      Math.abs(cab.lon - lon) < 0.01
  )
}

function find (location) {
  // 0.01 degrees = 1.11 km
  let radius = 0.01
  let cab
  while (!cab && radius < 0.05) {
    const closeCabs = getCabsInRadius(location, radius)
    cab = findClosest(location, closeCabs)
    radius += 0.01
  }
  return cab ? [null, cab] : [errors.cabNotFound, null]
}

function book ({ source, destination, user, cab }) {
  if (user.status != 'idle') return [errors.userNotIdle, null]

  if (!cab || cab.isBooked) {
    const [error, newCab] = find(source)
    if (error) return [error, null]
    cab = newCab
  } else cab = cabs.find(cabie => cabie.id === cab.id)

  try {
    const ride = createRide({ source, destination, user, cab })
    cab = updateCab({ ...cab, isBooked: true, currentRideId: ride.id })
    user = updateUser({ ...user, status: 'booked' })
    return [null, cab]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  find,
  book
}
