const { users } = require('../../data')

function updateUser (user) {
  try {
    if (!user.id) throw Error('Need User ID')
    const i = users.findIndex(entry => entry.id === user.id)
    Object.assign(users[i], user)
    return [null, user]
  } catch (err) {
    return [{ error: err.message }, null]
  }
}

module.exports = {
  updateUser
}
