const { cabs } = require('../../data')
const { errors } = require('../globals')
const { findDistance, findClosest } = require('../utils')
const { createRide } = require('./rides')
const { updateUser } = require('./users')

function readClosestCab ({ location, requestPink }) {
  // 0.01 degrees = 1.11 km
  let delta = 0.01
  let cab = null
  while (!cab && delta < 0.05) {
    const [error, availableCabs] = readAvailableCabs(
      location,
      requestPink,
      delta
    )
    if (error) return [error, null]
    cab = findClosest(location, availableCabs)
    delta += 0.01
  }
  return cab ? [null, cab] : [errors.noCabsAvailable, null]
}

function readAvailableCabs ({ lat, lon }, requestPink, delta = 0.01) {
  let availableCabs = cabs.filter(
    cab =>
      !cab.isBooked &&
      Math.abs(cab.lat - lat) < delta &&
      Math.abs(cab.lon - lon) < delta
  )
  if (requestPink) availableCabs = availableCabs.filter(cab => cab.isPink)
  return availableCabs.length
    ? [null, availableCabs]
    : [errors.noCabsAvailable, null]
}

function updateCab (cab) {
  try {
    const i = cabs.findIndex(entry => entry.id === cab.id)
    if (i === -1) throw Error(errors.cabIdNotFound)
    Object.assign(cabs[i], cab)
    return [null, cabs[i]]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  readClosestCab,
  readAvailableCabs,
  updateCab
}
