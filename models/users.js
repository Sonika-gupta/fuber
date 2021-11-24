const { users } = require('../data')

function updateUser (user) {
  if (!user.id) throw Error('Need User ID')
  const i = users.findIndex(entry => entry.id === user.id)
  Object.assign(users[i], user)
  return user
}

module.exports = {
  updateUser
}
