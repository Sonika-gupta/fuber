module.exports = {
  rideSerialNumber: 0,
  errors: {
    noCabsAvailable: 'No Cabs Available',
    userNotIdle: 'Finish the current ride to book another',
    cabIdNotFound: 'Cab not found',
    rideIdNotFound: 'Ride Not Found',
    userIdNotFound: 'User Not Found',
    undefinedRideId: 'Need Ride ID',
    undefinedCabId: 'Need Cab ID',
    undefinedUserId: 'Need User ID',
    rideOngoing: 'Ride Already Started',
    rideCompleted: 'Ride Already Completed',
    sourceRequired: 'Enter Pick up location',
    destinationRequired: 'Enter Drop location',
    cannotCancelRide:
      'Ride is Already Ongoing or Completed, Cannot be Cancelled',
    rideNotActive: 'Cannot update an inactive ride'
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
