const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Users = require('../models/Users')
const router = express.Router()


router.post('/', [
  check("first_name", "First Name is required!")
    .not()
    .notEmpty(),
  check("last_name", "Last Name is required!")
    .not()
    .notEmpty(),
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
    first_name,
    last_name,
    email,
    password,
    password2
  } = req.body

  try {
    //find user by email
    let user = await Users.findOne({ email })

    //if user exist
    if (user) {
      return res.json({ msg: "User already exists" })
    }
    else {
      if (password === password2) {
        //if user does not exist
        user = new Users({
          first_name,
          last_name,
          email,
          password
        });

        //hash password
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;
        user.password = hash;

        //save user with data
        await user.save()
        return res.json({ msg: "You have been registered" })
      }
      else {
        res.json({ msg: "Passwords don't match" })
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
});

module.exports = router;