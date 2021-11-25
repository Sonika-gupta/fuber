module.exports = {
  rideSerialNumber: 0,
  errors: {
    cabNotFound: 'No Cabs Available',
    userNotIdle: 'Finish the current ride to book another',
    cabIdNotFound: 'Cab not found',
    rideIdNotFound: 'Ride Not Found',
    undefinedRideId: 'Need Ride ID',
    rideOngoing: 'Ride Already Started',
    rideCompleted: 'Ride Already Completed'
  },
  rideStatus: {
    accepted: 'accepted',
    started: 'started',
    cancelled: 'cancelled',
    completed: 'completed'
  },
  userStatus: {
    idle: 'idle',
    waiting: 'waiting_for_cab',
    riding: 'onTrip'
  }
}
