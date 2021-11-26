const { cabs } = require('../data')
const { errors } = require('../src/globals')
const {
  readAvailableCabs,
  readAvailablePinkCabs,
  readClosestCab,
  updateCab
} = require('../src/models/cabs')

test('Available cabs at geekskool should return array of 3 cabs', () => {
  expect(
    readAvailableCabs({ lat: 12.961756055726415, lon: 77.64412371081289 })
  ).toEqual([null, cabs])
})

test('Available cabs at Adobe should show error of no cabs available', () => {
  expect(
    readAvailableCabs({
      lat: 12.987310885103668,
      lon: 77.67605335908235
    })
  ).toEqual([errors.noCabsAvailable, null])
})

test('Available pink cabs at geekskool should return array of 1 cab', () => {
  expect(
    readAvailableCabs({ lat: 12.961756055726415, lon: 77.64412371081289 }, true)
  ).toEqual([null, cabs.filter(cab => cab.isPink)])
})

test('Update Cab Status to booked', () => {
  expect(updateCab({ id: 2, isBooked: true })).toEqual([
    null,
    {
      id: 2,
      driver: 'Leela',
      lat: 12.96080249358276,
      lon: 77.64829793483432,
      isBooked: true,
      isPink: false
    }
  ])
})

test('Booked cab should not show in Available cabs', () => {
  expect(
    readAvailableCabs({ lat: 12.961756055726415, lon: 77.64412371081289 })
  ).toEqual([null, cabs.filter(cab => cab.isBooked != true)])
})
