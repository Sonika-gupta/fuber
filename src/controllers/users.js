const { users: model } = require('../models')

function getUser (req, res) {
  const [error, result] = model.readUser(req.params.id)
  error
    ? res
        .status(error.status || 500)
        .send({ error: { ...error, message: error.message } })
    : res.send(result)
}

module.exports = {
  getUser
}
