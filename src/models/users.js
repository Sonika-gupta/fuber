const { users } = require('../../data')
const { UserError } = require('../classes')
const { errors, userStatus } = require('../globals')

function updateUser (user) {
  try {
    if (!user.id) throw new UserError(errors.undefinedUserId)
    const i = users.findIndex(entry => entry.id === user.id)
    if (i == -1) throw new UserError(errors.userIdNotFound, 404)

    if (
      user.status === userStatus.waiting &&
      users[i].status != userStatus.idle
    )
      throw new UserError(errors.userNotIdle, 403)

    Object.assign(users[i], user)
    return [null, user]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  updateUser
}
