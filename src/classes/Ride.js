const { findDistance } = require('./utils')
const globals = require('./globals')

class Ride {
  constructor ({ userId, cabId, source, destination }) {
    this.id = ++globals.rideSerialNumber
    this.userId = userId
    this.cabId = cabId
    this.status = undefined // enum ['active', 'cancelled', 'completed']
    this.source = source
    this.destination = destination
    this.startTime = undefined
    this.endTime = undefined
  }

  get amount () {
    const distance = findDistance(this.source, this.destination)
    return distance * 2
  }
}

module.exports = {
  Ride
}
