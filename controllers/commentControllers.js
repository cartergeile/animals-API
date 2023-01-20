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
  } else {
    res.sendStatus(401)
  }
})

// DELETE `/comments/delete/<animalId>/<commentId>
router.delete('/delete/:animalId/:commentId', (req, res) => {
  const { animalId, commentId } = req.params
  Animal.findById(animalId)
    .then(animal => {
    const theComment = animal.comments.id(commentId)
    console.log('this is the comment to be deleted: \n', theComment)
    if (req.session.loggedIn) {
      if (theComment.author == req.session.userId) {
        theComment.remove()
        animal.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(400).json(err)
  })
})




// EXPORT ROUTER
module.exports = router