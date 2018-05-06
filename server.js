if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')

const routes = require('./routes/index')
const port = process.env.PORT || 3000

const app = express()

app.use('/', routes)

app.listen(port, console.log(`Listening on port ${port}`))
