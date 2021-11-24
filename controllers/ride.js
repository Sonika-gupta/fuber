const cabModel = require('../models/cabs')

function findRide (req, res) {
  const { lat, lon } = req.query
  console.log(lat, lon)
  const [error, result] = cabModel.find({ lat, lon })
  error ? res.status(500).send({ error }) : res.send(result)
}

function bookRide (req, res) {
  const [error, result] = cabModel.book(req.body)
  error ? res.status(500).send({ error }) : res.send(result)
}
module.exports = {
  findRide,
  bookRide
}
