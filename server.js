// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const AnimalRouter = require('./controllers/animalControllers')
const UserRouter = require('./controllers/userControllers')

// import models
const Animal = require('./models/animal')
const middleware = require('./utils/middleware')


  // express app object
  const app = express()

  // middleware
  middleware(app)

  /* --------- ROUTES -------- */
  app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
  })

  app.use('/animals', AnimalRouter)
  app.use('/users', UserRouter)

// REGISTER ROUTES
app.use('/animals', AnimalRouter)


  // Server Listener
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))