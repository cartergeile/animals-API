// Schema and model for animals resource

const mongoose = require('../utils/connection')

// destructure Schema and model function from mongoose
const { Schema, model } = mongoose

// animals Schema
const animalSchema = new Schema({
  name:  {type : String },
  color: {type: String},
  age: {type: Number},
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// make the model
const Animal = model('Animal', animalSchema)

// export model
module.exports = Animal