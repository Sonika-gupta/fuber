const model = require('../models/cabs')

function getCabs (req, res) {
  const { lat, lon } = req.query
  console.log(lat, lon)
  const [error, result] = model.readAvailableCabs({ lat, lon })
  error ? res.status(500).send({ error }) : res.send(result)
}

function getPinkCabs (req, res) {
  const { lat, lon } = req.query
  console.log(lat, lon)
  const [error, result] = model.readAvailablePinkCabs({ lat, lon })
  error ? res.status(500).send({ error }) : res.send(result)
}

module.exports = {
  getCabs,
  getPinkCabs
}
