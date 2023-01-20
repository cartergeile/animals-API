// IMPORT DEPENDENCIES
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// CREATE ROUTER
const router = express.Router()

//-----------ROUTES

//GET -> /users/signup
router.get('/signup', (req, res) => {
  res.render('users/signup')
})

//POST -> /users/signup
router.post('/signup', async (req, res) => {
  const newUser = req.body
  newUser.password = await bcrypt.hash(
    newUser.password,
    await bcrypt.genSalt(10)
  )
  User.create(newUser)
    .then(user => {
      res.status(201).json({ username: user.username })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

// POST -> /users/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(password, user.password)
          if (result) {
            req.session.username = username
            req.session.loggedIn = true
            req.session.userId = user.id
            res.status(201).json({ username: user.username })
          } else {
            res.json({ error: 'Username or password is incorrect' })
          }
      } else {
        res.json({ error: 'User does not exist'})
      }
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})


// DELETE -> users/logout
router.delete('/logout', (req, res) => {
  req.session.destroy(err => {
    console.log('this is the req.session upon logout \n', req.session)
    res.sendStatus(204)
  })
})



//EXPORT ROUTER
module.exports = router