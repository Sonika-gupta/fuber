const cabModel = require('../models/cabs')
const rideModel = require('../models/rides')

function find (req, res) {
  const { lat, lon } = req.query
  console.log(lat, lon)
  const [error, result] = cabModel.find({ lat, lon })
  error ? res.status(500).send({ error }) : res.send(result)
}

function book (req, res) {
  const [error, result] = cabModel.book(req.body)
  console.log(error, result)
  error ? res.status(500).send({ error }) : res.send(result)
}

function start (req, res) {
  const [error, result] = rideModel.start(req.params)
  error ? res.status(500).send({ error }) : res.send(result)
}
module.exports = {
  find,
  book,
  start
}
