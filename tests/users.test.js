const { userStatus, errors } = require('../src/globals')
const { updateUser } = require('../src/models/users')
const { UserError } = require('../src/classes')
test('User Already Engaged should not be able to book ride', () => {
  updateUser({ id: 1, status: userStatus.waiting })
  expect(updateUser({ id: 1, status: userStatus.waiting })).toEqual([
    new UserError(errors.userNotIdle),
    null
  ])
})

test('User Already Engaged should not be able to book ride', () => {
  updateUser({ id: 1, status: userStatus.riding })
  expect(updateUser({ id: 1, status: userStatus.waiting })).toEqual([
    new UserError(errors.userNotIdle),
    null
  ])
})
