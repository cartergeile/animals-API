// IMPORT DEPENDENCIES
require('dotenv').config()
const mongoose = require('mongoose')

// DATABASE CONNECTION
const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// ESTABLISH DATABASE CONNECTION
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do
mongoose.connection
  .on('open', () => console.log('Connected to mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (err) => console.log('An error occured: \n', err))

  // EXPORT CONNECTION
  module.exports = mongoose