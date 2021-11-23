const model = require('../models/cabs')

function findRide (req, res) {
  const { lat, lon } = req.query
  console.log(lat, lon)
  const [error, result] = model.findCab({ lat, lon })
  error ? res.status(500).send({ error }) : res.send(result)
}

module.exports = {
  findRide
}
