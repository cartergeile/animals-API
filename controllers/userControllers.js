// IMPORT DEPENDENCIES
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// CREATE ROUTER
const router = express.Router()

//-----------ROUTES

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





//EXPORT ROUTER
module.exports = router