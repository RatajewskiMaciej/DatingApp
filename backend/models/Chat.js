const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Chat = new Schema({
  sendersID: {
    type: Array
  },
  messages: {
    type: Array,
    message: {
      type: String
    },
    login: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = mongoose.model('Chat', Chat);


