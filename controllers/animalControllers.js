// IMPORT DEPENDENCIES
const express = require('express')
const Animal = require('../models/animal')

// CREATE ROUTE
const router = express.Router()


// ROUTES

  // INDEX(GET) -> displays all animals
  router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    Animal.find({})
    .populate('owner', 'username')
    .populate('comments.author', '-password')
    .then(animals => { 
      //res.json({ animals: animals })
      res.render('animals/index', { animals, username, loggedIn, userId })
    })
    .catch(err => {
      console.log(err)
      //res.status(404).json(err)
      res.redirect(`/error?error=${err}`)
    })
  })
    
// GET for the new page
router.get('/new', (req, res) => {
  res.render('animals/new', { ...req.session })
})

// CREATE(POST) -> creates new document in database
  router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    const newAnimal = req.body
    Animal.create(newAnimal)
      // send 201 and json response
      .then(animal => {
        //res.status(201).json({animal: animal.toObject()})
        res.redirect(`/animals/${animal.id}`)
      })
      // catch errors
      .catch(err => {
        console.log(err)
        //res.status(404).json(err)
        res.redirect(`/error?error=${err}`)
      })
  })

// GET ROUTE -> ONLY SHOW LOGGED IN USERS ANIMALS
  router.get('/mine', (req, res) => {
    Animal.find({ owner: req.session.userId })
    .populate('owner', '-password')
    .populate('comments.author', '-password')
    .then(animals => {
      //res.status(200).json({ animals: animals })
      res.render('animals/index', { animals, ...req.session })
    })
    .catch(err => {
      console.log(err)
      //res.status(400).json(err)
      res.redirect(`/error?error=${err}`)
    })
  })

// Get request -> edit route
// shows form for updating an animal
router.get('/edit/:id', (req, res) => {
  const animalId = req.params.id
  Animal.findById(animalId)
  .then(animal => {
    res.render('animals/edit', { animal, ...req.session})
  })
  .catch(err => {
    res.redirect(`/error?error=${err}`)
  })
})

// UPDATE(PUT) -> updates a specific animal, only if owner is updating
  router.put('/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
      .then(animal => {
        if (animal.owner == req.session.userId) {
          //res.sendStatus(204)
          return animal.updateOne(req.body)
        } else {
          //res.sendStatus(401)
          res.redirect(`/error?error=You%20are%20not%20allowed%20to%20edit%20this%20animal`)
        }        
      })
      .then(() => {
        res.redirect(`/animals/mine`)
      })
      .catch(err => {
        console.log(err)
        //res.status(400).json(err)
        res.redirect(`/error?error=${err}`)
      })
  })
    
// DELETE -> delete specific animal
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Animal.findById(id)
    .then(animal => {
      if (animal.owner == req.session.userId) {
        //res.sendStatus(204)
        return animal.deleteOne(req.body)
      } else {
        //res.sendStatus(401)
        res.redirect(`/error?error=You%20are%20not%20allowed%20to%20delet%20this%20animal`)
      }
      
    })
    .then(() => {
      res.redirect('/animals/mine')
    })
    .catch(err => {
      console.log(err)
      //res.status(400).json(err)
      res.redirect(`/error?error=${err}`)
    })
})
// SHOW(GET)-> finds and displays single resource
  router.get('/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
    .populate('comments.author', 'username')
      .then(animal => {
        //res.json({ animals: animals })
        res.render('animals/show.liquid', { animal, ...req.session })
      })
      .catch(err => {
        console.log(err)
        //res.status(404).json(err)
        res.redirect(`/error?error=${err}`)
      })
  })
  



// EXPORT THE ROUTER
module.exports = router