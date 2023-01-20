// IMPORT DEPENDENCIES
const express = require('express')
const Animal = require('../models/animal')

// CREATE ROUTE
const router = express.Router()


// ROUTES

// POST `/comments/<someAnimalId>
router.post('/:animalId', (req, res) => {
  const animalId = req.params.animalId
  if (req.session.loggedIn) {
    req.body.author = req.session.userId
  } else {
    res.sendStatus(401)
  }
  const theComment = req.body
  Animal.findById(animalId)
  .then(animal => {
    animal.comments.push(theComment)
    return animal.save()
  })
  .then(animal => {
    res.status(201).json({ animal: animal })
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

// DELETE




// EXPORT ROUTER
module.exports = router