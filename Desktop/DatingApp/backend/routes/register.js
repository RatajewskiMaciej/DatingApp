const express = require('express');
const router = express.Router();
const Users = require('../models/models')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//TWORZENIE KONTA

router.post('/', [
  check("name", "Email is require!")
    .not()
    .notEmpty(),
  check("email", "Email is require!")
    .not()
    .notEmpty()
    .isEmail(),
  check('password', "Password have to min 5 length")
    .isLength({ min: 5 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body

    try {
      //sprawdzenie czy istnieje uzytkownik o podanym mailu
      let user = await Users.findOne({ email })

      if (user) {
        return res.json({ msg: "User is already exist" })
      }
      //jezeli nie istnieje tworzymy nowego
      user = new Users({
        email,
        password,
        name
      })

      //hash`ujemy

      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(password, salt);

      //zapisujemy haslo za`hashowane
      user.password = hash
      await user.save()


      //tworzymy dana do tokena
      const payload = { user: { id: user.id } }

      //tworzymy tokena
      jwt.sign(payload, "secretKey", { expiresIn: 360000 }, function (err, token) {
        if (err) throw err;
        res.json({ token });
      });

    } catch (error) {
      console.log(error.message)
      res.send("Server error")
    }
  })
module.exports = router