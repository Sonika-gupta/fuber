const { findDistance, findTimeDifferece } = require('../utils')
const globals = require('../globals')

class Ride {
  constructor ({ userId, cab, source, destination }) {
    this.id = ++globals.rideSerialNumber
    this.userId = userId
    this.cab = {
      id: cab.id,
      driver: cab.driver,
      isPink: cab.isPink
    }
    this.status = 'accepted' // enum ['started', 'cancelled', 'completed']
    this.source = source
    this.destination = destination
    this.startTime = null
    this.endTime = null
  }

  get distance () {
    return findDistance(this.source, this.destination)
  }

  get time () {
    return findTimeDifferece(this.endTime, this.startTime)
  }

  get pinkCabCharge () {
    return this.cab.isPink ? 5 : 0
  }

  get charge () {
    return this.distance * 2 + this.time + this.pinkCabCharge
  }

  getReceipt (params) {
    return {
      pickUpLocation: this.source,
      dropLocation: this.destination,
      distance: this.distance,
      time: this.time,
      pinkCabCharge: this.pinkCabCharge,
      charge: this.charge
    }
  }
}

module.exports = {
  Ride
}
