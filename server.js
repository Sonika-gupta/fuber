const express = require('express')
const app = express()

const rideRouter = require('./routers/ride')

app.use(express.json())
app.use('/ride', rideRouter)

app.listen(8000, () => {
  console.log('listening on 8000')
})
