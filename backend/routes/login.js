const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const Users = require('../models/Users')
const router = express.Router()
const key = config.get('secretKey')

router.post('/', [
  check("email", "Email is required!")
    .not()
    .notEmpty()
    .isEmail(),
  check('password', "Password has to be min 5 characters")
    .isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    email,
    password
  } = req.body

  try {
    //find user by email
    let user = await Users.findOne({ email })

    //if user exist
    if (!user) {
      return res.json({ msg: "User does not exist" })
    }
    else {

      //check password
      const match = await bcrypt.compare(password, user.password)

      //if password is wrong
      if (!match) {
        return res.json({ msg: "Email or Password is incorrect" })
      }
      else {

        //data in token
        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(payload, key, { expiresIn: 360000 }, (err, token) => {
          if (err) {
            throw err
          }
          else {
            res.json({ token })
          }
        })
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
});

module.exports = router;