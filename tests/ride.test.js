const { find, book } = require('../src/models/cabs')
const { users, cabs } = require('../data')
const { errors } = require('../src/globals')

test('find: closest cab to user with id 1 should be cab with id 1', () => {
  const user = users.find(user => user.id === 1)
  const cab = cabs.find(cab => cab.id === 1)
  expect(find(user)).toEqual([null, cab])
})

test('find: no cab in range for user with id 3', () => {
  const user = users.find(user => user.id === 3)
  expect(find(user)).toEqual([errors.cabNotFound, null])
})

test('book: book the closest cab', () => {
  const user = users.find(user => user.id === 1)
  const cab = cabs.find(cab => cab.id === 1)
  expect(
    book({ source: { lat: user.lat, lon: user.lon }, destination: {}, user })
  ).toEqual([null, { ...cab, isBooked: true }])
})

test('book: cannot book if user not idle', () => {
  const user = users.find(user => user.id === 1)
  expect(
    book({ source: { lat: user.lat, lon: user.lon }, destination: {}, user })
  ).toEqual([errors.userNotIdle, null])
})

test('book: book the next closest cab when closest one is not available', () => {
  const user = users.find(user => user.id === 2)
  const i = cabs.findIndex(cab => cab.id === 1)
  Object.assign(cabs[i], { isBooked: true })
  const cab = cabs.find(cab => cab.id === 2)
  expect(
    book({ source: { lat: user.lat, lon: user.lon }, destination: {}, user })
  ).toEqual([null, { ...cab, isBooked: true }])
})
