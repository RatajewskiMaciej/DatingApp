const express = require('express');
const router = express.Router();
const Users = require('../models/models')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//DANE ZALOGOWANEGO UZYTKOWNIKA UZYSKANE DZIEKI TOKENA
//AUTORYZACJA TOKENA PRZEZ MIDDLEWARE

router.get('/', auth, async (req, res) => {
  try {

    //WYSZUKANIE UZYTKOWNIKA PRZEZ REQ.USER <-- zapisalismy tak w middleware
    const user = await Users.findById(req.user.id).select('-password');
    //Ukazanie danych zalogowanego uzytkownika
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//LOGOWANIE UZYTKOWNIKA
router.post('/', [

  //sprawdzenie czy wpisany jest poprawny mail oraz haslo

  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  //restrukturyzacja inputow 

  const { email, password } = req.body;

  try {
    //szukanie uzytkownika po mailu
    let user = await Users.findOne({ email });
    //jak nie znaleziony to dajemy blad
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    //jak znaleziony to musimy dopasowac hasla
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      //jak haslo nie pasuje to dajemy blad
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    //jak haslo pasuje to tworzymy token aby uzyskac dane zalogowanego uzytkownika
    const payload = {
      user: {
        id: user.id
      }
    };
    //tworzymy tokena zalogowanego uzytkownika
    jwt.sign(
      payload,
      'secretKey',
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        //wysylamy dane zalogowanego uzytkownika
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message)
    res.send("Server error")
  }
})

module.exports = router;