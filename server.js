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

  