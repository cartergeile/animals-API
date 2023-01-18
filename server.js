// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')

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

  // BUILD A SEED ROUTE -> make a few animals to start with
app.get('/animals/seed', (req, res) => {
  const startAnimals = [
    {name: 'Bear', color: 'Brown', age: '7'},
    {name: 'Lion', color: 'Orange', age: '11'},
    {name: 'Alligator', color: 'Green', age: '2'},
    {name: 'Elephant', color: 'Grey', age: '27'},
    {name: 'Zebra', color: 'Black', age: '13'},
  ]
  Animal.deleteMany({})
    .then(() => {
      Animal.create(startAnimals)
        .then(data => {
          res.json(data)
        })
        .catch(err => console.log('Error: \n', err))
    })
    
})
// REGISTER ROUTES
app.use('/animals', AnimalRouter)


  // Server Listener
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))