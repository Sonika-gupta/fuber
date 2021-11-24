const cabModel = require('../models/cabs')

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
module.exports = {
  find,
  book
}
