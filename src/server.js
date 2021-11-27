const express = require('express')
const app = express()
const { rides: rideRouter } = require('./routers')

app.use(express.static(process.cwd() + '/public'))
app.use(express.json())
app.use('/rides', rideRouter)

app.listen(8000, () => {
  console.log('listening on 8000')
})
