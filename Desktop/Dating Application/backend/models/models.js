const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  aboutMe: { type: String }
})

module.exports = mongoose.model('User', newUser);