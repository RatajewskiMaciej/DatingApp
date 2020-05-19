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
  avatars: {
    type: Array
  },
  description: { type: String },
  age: { type: Number },
  genderPreferenceMale: { type: Boolean, default: false },
  genderPreferenceFemale: { type: Boolean, default: false },
  ageRange: { type: Array, default: [22, 40] },
  city: { type: String },
  users: [{
    id: { type: String },
    name: { type: String },
    age: { type: Number },
    avatar: { type: String },
    fit: { type: Number }
  }],
  match: {
    type: String,
    default: "80%"
  },
  questionnaire: {
    type: Object
  }
});

module.exports = mongoose.model("User", User)