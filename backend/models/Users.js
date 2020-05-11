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
  gender: {
    genderPreferenceMale: { type: Boolean },
    genderPreferenceFemale: { type: Boolean }
  },
  ageRange: { type: Array, default: [18, 70] },
  city: { type: String },
  users: [{
    id: { type: String },
    name: { type: String },
    age: { type: Number },
    avatar: { type: String },
    fit: { type: Number }
  }]
});

module.exports = mongoose.model("User", User)