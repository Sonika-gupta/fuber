const { rides } = require('../data')
const { Ride } = require('../values')

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

function startRide ({ id }) {
  rides.findIndex()
}
module.exports = {
  createRide
}
