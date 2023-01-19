// SCHEMA AND MODEL FOR THE USER RESOURCE

// BRING IN MONGOOSE FROM UTILS
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true
  }
})

const User = model('User', userSchema)

// EXPORT MODEL
module.exports = User