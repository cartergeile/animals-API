// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')

// import models
const Animal = require('./models/animal')

// database connection
// make sure to add to .env
const DATABASE_URL = process.env.DATABASE_URL
// db config object
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// establish db connectioon
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do
mongoose.connection
  .on('open', () => console.log('Connected to mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (err) => console.log('An error occured: \n', err))

  // express app object
  const app = express()

  // middleware
  app.use(morgan('tiny'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(express.json())

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
  // INDEX(GET) -> displays all animals
app.get('/animals', (req, res) => {
  Animal.find({})
  .then(animals => { res.json({ animals: animals })})
  .catch(err => console.log('The following error occurecd: \n', err))
})
  // CREATE(POST) -> creates new document in database
app.post('/animals', (req, res) => {
  const newAnimal = req.body
  Animal.create(newAnimal)
    // send 201 and json response
    .then(animal => {
      res.status(201).json({animal: animal.toObject()})
    })
    // catch errors
    .catch(err => console.log(err))
})
  // UPDATE(PUT) -> updates a specific animal

  // DELETE -> delete specific animal

  // SHOW(GET)-> finds and displays single resource




  // Server Listener
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))