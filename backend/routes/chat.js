const express = require('express');
const router = express.Router()
const Users = require('../models/Users')
const Chat = require('../models/Chat')
const auth = require('../middleware/auth.js');



router.get("/:id", [auth], async (req, res) => {
  const mainUser = req.user.id
  const selectedUser = req.params.id
  try {
    const chat = await Chat.findOne({ sendersID: mainUser, sendersID: selectedUser })
    return res.json(chat)
  } catch (error) {
    console.log(error.messages)
  }
})





module.exports = router