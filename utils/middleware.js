// IMPORT DEPENDENCIES
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')
require('dotenv').config()
const methodOverride = require('method-override')

// MIDDLEWARE FUNCTION
const middleware = (app) => {
  app.use(methodOverride('_method'))
  app.use(morgan('tiny'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(express.json())
  app.use(
    session({
      secret: process.env.SECRET,
      store: mongoStore.create({
        mongoUrl: process.env.DATABASE_URL
      }),
      saveUninitialized: true,
      resave: false
    })
  )
}

// EXPORT MIDDLEWARE FUNCTION
module.exports = middleware