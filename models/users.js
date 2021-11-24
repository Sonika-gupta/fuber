const { users } = require('../data')

function updateUser (user) {
  const i = users.findIndex(entry => entry.id === user.id)
  users[i] = user
  return user
}

module.exports = {
  updateUser
}
