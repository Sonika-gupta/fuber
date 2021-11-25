const { cabs } = require('../../data')
const { errors } = require('../globals')
const { findDistance, findClosest } = require('../utils')
const { createRide } = require('./rides')
const { updateUser } = require('./users')

function readClosestCab (location) {
  // 0.01 degrees = 1.11 km
  let radius = 0.01
  let cab = null
  while (!cab && radius < 0.05) {
    const [error, availableCabs] = readAvailableCabs(location, radius)
    if (error) return [error, null]
    cab = findClosest(location, availableCabs)
    radius += 0.01
  }
  return cab ? [null, cab] : [errors.cabNotFound, null]
}

function readAvailableCabs ({ lat, lon }, radius = 0.01) {
  const availableCabs = cabs.filter(
    cab =>
      !cab.isBooked &&
      Math.abs(cab.lat - lat) < radius &&
      Math.abs(cab.lon - lon) < radius
  )
  return availableCabs.length ? [null, cabs] : [errors.cabNotFound, null]
}

function readAvailablePinkCabs (location) {
  let [error, availableCabs] = readAvailableCabs(location)
  if (availableCabs) {
    availableCabs = availableCabs.filter(cab => cab.isPink)
  }
  return availableCabs.length
    ? [null, availableCabs]
    : [errors.cabNotFound, null]
}

function updateCab (cab) {
  try {
    const i = cabs.findIndex(entry => entry.id === cab.id)
    if (i === -1) throw Error(errors.cabIdNotFound)
    Object.assign(cabs[i], cab)
    console.log('updated', cabs[i])
    return [null, cabs[i]]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  readClosestCab,
  readAvailableCabs,
  readAvailablePinkCabs,
  updateCab
}
