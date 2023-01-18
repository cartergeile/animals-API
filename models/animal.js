// Schema and model for animals resource

const mongoose = require('../utils/connection')

// destructure Schema and model function from mongoose
const { Schema, model } = mongoose

// animals Schema
const animalSchema = new Schema({
  name: String,
  color: String,
  age: Number
})

// make the model
const Animal = model('Animal', animalSchema)

// export model
module.exports = Animal