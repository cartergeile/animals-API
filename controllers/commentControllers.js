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
      //res.status(201).json({ animal: animal })
      res.redirect(`/animals/${animal.id}`)
    })
    .catch(err => {
      console.log(err)
      //res.status(400).json(err)
      res.redirect(`/error?error=${err}`)
    })
  } else {
    //res.sendStatus(401)
    res.redirect(`/error?error=You%20are%20not%20allowed%20to%20comment%20on%20this%20animal`)
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
        //res.sendStatus(204)
        res.redirect(`/animals/${animal.id}`)
      } else {
        //res.sendStatus(401)
        res.redirect(`/error?error=You%20are%20not%20allowed%20to%20delete%20this%20comment`)
      }
    } else {
      //res.sendStatus(401)
      res.redirect(`/error?error=You%20are%20not%20allowed%20to%20delete%20this%20comment`)
    }
  })
  .catch(err => {
    console.log(err)
    //res.sendStatus(400).json(err)
    res.redirect(`/error?error=${err}`)
  })
})




// EXPORT ROUTER
module.exports = router