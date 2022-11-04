const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model(User,'UserSchema')