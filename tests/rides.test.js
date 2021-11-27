const { createRide, updateRide } = require('../src/models/rides')
const { errors, rideStatus } = require('../src/globals')
const { users, cabs, rides } = require('../data')
const { UserError } = require('../src/classes')

test('Create new ride without user should fail', () => {
  const cab = cabs.find(cab => cab.id == 1)
  expect(
    createRide({
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      cab
    })
  ).toEqual([new UserError(errors.undefinedUserId), null])
})

test('Create new ride without cab should fail', () => {
  const user = users.find(user => user.id == 2)
  expect(
    createRide({
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      user
    })
  ).toEqual([new UserError(errors.undefinedCabId), null])
})

test('Create new ride without source should ask for pickup location', () => {
  const user = users.find(user => user.id == 2)
  const cab = cabs.find(cab => cab.id == 1)
  expect(
    createRide({
      user,
      cab
    })
  ).toEqual([new UserError(errors.sourceRequired), null])
})

test('Create new ride without destination should ask for drop location', () => {
  const user = users.find(user => user.id == 2)
  const cab = cabs.find(cab => cab.id == 1)
  expect(
    createRide({
      user,
      cab,
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      }
    })
  ).toEqual([new UserError(errors.destinationRequired), null])
})

test('Create new ride', () => {
  const user = users.find(user => user.id == 2)
  const cab = cabs.find(cab => cab.id == 1)
  expect(
    createRide({
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      user,
      cab
    })
  ).toEqual([
    null,
    {
      id: 1,
      userId: 2,
      cab: {
        id: 1,
        driver: 'Resida',
        isPink: false,
        lat: 12.961482100489755,
        lon: 77.64549770865008
      },
      status: 'accepted',
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      startTime: null,
      endTime: null
    }
  ])
})

test('Updating ride without id not possible', () => {
  expect(updateRide({ startTime: Date.now() })).toEqual([
    new UserError(errors.undefinedRideId),
    null
  ])
})

test('Start a ride', () => {
  expect(
    updateRide({ id: 1, startTime: 1637835011712, status: rideStatus.started })
  ).toEqual([
    null,
    {
      id: 1,
      userId: 2,
      cab: {
        id: 1,
        driver: 'Resida',
        isPink: false,
        lat: 12.961482100489755,
        lon: 77.64549770865008
      },
      status: 'started',
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      startTime: 1637835011712,
      endTime: null
    }
  ])
})

test('Starting an ongoing ride should fail', () => {
  expect(
    updateRide({ id: 1, startTime: 1637835013242, status: rideStatus.started })
  ).toEqual([new UserError(errors.rideOngoing), null])
})

test('End a ride', () => {
  expect(
    updateRide({ id: 1, endTime: 1637835013242, status: rideStatus.completed })
  ).toEqual([
    null,
    {
      id: 1,
      userId: 2,
      cab: {
        id: 1,
        driver: 'Resida',
        isPink: false,
        lat: 12.961482100489755,
        lon: 77.64549770865008
      },
      status: 'completed',
      source: {
        lat: 12.961756055726415,
        lon: 77.64412371081289
      },
      destination: {
        lat: 13.198666126985055,
        lon: 77.70648550896739
      },
      startTime: 1637835011712,
      endTime: 1637835013242
    }
  ])
})

test('Ending a completed ride should fail', () => {
  expect(
    updateRide({ id: 1, endTime: 1637835013242, status: rideStatus.completed })
  ).toEqual([new UserError(errors.rideCompleted), null])
})

test('Cancelling a started or completed ride should fail', () => {
  expect(updateRide({ id: 1, status: rideStatus.cancelled })).toEqual([
    new UserError(errors.cannotCancelRide),
    null
  ])
})
