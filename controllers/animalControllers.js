// IMPORT DEPENDENCIES
const express = require('express')
const Animal = require('../models/animal')

// CREATE ROUTE
const router = express.Router()


// ROUTES

  // INDEX(GET) -> displays all animals
  router.get('/', (req, res) => {
    Animal.find({})
    .populate('owner', '-password')
    .populate('comments.author', '-password')
    .then(animals => { res.json({ animals: animals })})
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
  })
    
// CREATE(POST) -> creates new document in database
  router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    const newAnimal = req.body
    Animal.create(newAnimal)
      // send 201 and json response
      .then(animal => {
        res.status(201).json({animal: animal.toObject()})
      })
      // catch errors
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  })

// GET ROUTE -> ONLY SHOW LOGGED IN USERS ANIMALS
  router.get('/mine', (req, res) => {
    Animal.find({ owner: req.session.userId })
    .populate('owner', '-password')
    .populate('comments.author', '-password')
    .then(animals => {
      res.status(200).json({ animals: animals })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
  })

// UPDATE(PUT) -> updates a specific animal, only if owner is updating
  router.put('/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
      .then(animal => {
        if (animal.owner == req.session.userId) {
          res.sendStatus(204)
          return animal.updateOne(req.body)
        } else {
          res.sendStatus(401)
        }
        
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  })
    
// DELETE -> delete specific animal
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Animal.findById(id)
    .then(animal => {
      if (animal.owner == req.session.userId) {
        res.sendStatus(204)
        return animal.deleteOne(req.body)
      } else {
        res.sendStatus(401)
      }
      
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})
// SHOW(GET)-> finds and displays single resource
  router.get('/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
    .populate('comments.author', 'username')
      .then(animals => {
        res.json({ animals: animals })
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  })
  



// EXPORT THE ROUTER
module.exports = router