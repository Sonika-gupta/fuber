const { cabs: model } = require('../models')

function getCabs (req, res) {
  const { lat, lon, requestPink } = req.query
  const [error, result] = model.readAvailableCabs({ lat, lon }, requestPink)
  error ? res.status(error.status || 500).send(error.message) : res.send(result)
}

module.exports = {
  getCabs
}
