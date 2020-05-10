const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: { type: String },
  description: { type: String },
  age: { type: Number },
  gender: { type: String },
  ageRange: { type: Array },
  city: { type: String }
});

module.exports = mongoose.model("User", User)