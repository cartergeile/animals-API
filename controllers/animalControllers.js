// IMPORT DEPENDENCIES
const express = require('express')
const Animal = require('../models/animalContollers')

// CREATE ROUTE
const router = express.Router()


// ROUTES

  // INDEX(GET) -> displays all animals
  router.get('/', (req, res) => {
    Animal.find({})
    .then(animals => { res.json({ animals: animals })})
    .catch(err => console.log('The following error occurecd: \n', err))
  })
    // CREATE(POST) -> creates new document in database
  router.post('/', (req, res) => {
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
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedAnimal = req.body 
    Animal.findByIdAndUpdate(id, updatedAnimal, {new: true })
      .then(animal => {
        res.sendStatus(204)
      })
      .catch(err => console.log(err))
  })
    // DELETE -> delete specific animal
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch(err => console.log(err))
  })
    // SHOW(GET)-> finds and displays single resource
  router.get('/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
      .then(animal => {
        res.json({ animal: animal })
      })
      .catch(err => console.log(err))
  })
  



// EXPORT THE ROUTER
module.exports = router