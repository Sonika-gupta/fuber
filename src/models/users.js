const { users } = require('../../data')
const { errors, userStatus } = require('../globals')

function updateUser (user) {
  try {
    if (!user.id) throw Error('Need User ID')
    const i = users.findIndex(entry => entry.id === user.id)
    if (i == -1) throw Error(errors.userIdNotFound)

    if (
      user.status === userStatus.waiting &&
      users[i].status != userStatus.idle
    )
      throw Error(errors.userNotIdle)

    Object.assign(users[i], user)
    return [null, user]
  } catch (err) {
    return [err.message, null]
  }
}

module.exports = {
  updateUser
}
