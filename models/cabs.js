const data = require('../data')
const { findDistance, findClosest } = require('../utils')
const { Ride } = require('../values')

function updateData (table, item) {
  data[table] = data[table].map(entry => (entry.id === item.id ? item : entry))
}

function getCabsInRadius ({ lat, lon }, radius) {
  return data.cabs.filter(
    cab =>
      cab.isBooked &&
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
  return cab ? [null, cab] : ['No Cabs Available', null]
}

function book ({ source, destination, user, cab }) {
  if (user.isRiding) return ['Finish the current ride to book another', null]

  if (!cab || cab.isBooked) {
    const [error, newCab] = this.find(source)
    if (error) return [error, null]
    cab = newCab
  } else cab = data.cabs.find(cabie => cabie.id === cab.id)
  const ride = new Ride({
    userId: user.id,
    cabId: cab.id,
    source,
    destination
  })
  console.log(ride)

  try {
    data.rides.push(ride)
    cab.isBooked = user.isRiding = true
    updateData('cabs', cab)
    updateData('users', user)
    return [null, cab]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  find,
  book
}
