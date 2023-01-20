// SCHEMA FOR COMMENT SUBDOCUMENT
const mongoose = require('../utils/connection')

// destructure schema function from mongoose
const { Schema } = mongoose

// COMMENT SCHEMA
const commentSchema = new Schema({
  note: {
    type: String,
    required: true  
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// EXPORT SCHEMA
module.exports = commentSchema