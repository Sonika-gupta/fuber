const { find, book } = require('./models/cabs')
const { users, cabs } = require('./data')
const { errors } = require('./globals')

test('closest cab to user with id 1 should be cab with id 1', () => {
  const user = users.find(user => user.id === 1)
  const cab = cabs.find(cab => cab.id === 1)
  expect(find(user)).toEqual([null, cab])
})

test('no cab in range for user with id 3', () => {
  const user = users.find(user => user.id === 3)
  expect(find(user)).toEqual([errors.cabNotFound, null])
})
