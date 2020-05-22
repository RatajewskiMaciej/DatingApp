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
  res1: { type: String },
  res2: { type: String },
  res3: { type: String },
  res4: { type: String },
  res5: { type: String },
  res6: { type: String },
  res7: { type: String },
  res8: { type: String },
  res9: { type: String },
  res10: { type: String },
  res11: { type: String },
  res12: { type: String },
  blockedUser: { type: Array },
  follows: { type: Array },

});

module.exports = mongoose.model("User", User)