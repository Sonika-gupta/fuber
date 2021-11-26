const model = require('../models/cabs')

function getCabs (req, res) {
  const { lat, lon, requestPink } = req.query
  console.log(lat, lon, requestPink)
  const [error, result] = model.readAvailableCabs({ lat, lon }, requestPink)
  error ? res.status(500).send({ error }) : res.send(result)
}

module.exports = {
  getCabs
}
