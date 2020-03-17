const express = require('express');
const router = express.Router();
const Users = require('../models/models')
const auth = require('../middleware/auth');


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

router.put('/add', auth, async (req, res) => {

  const { name, email, age, aboutMe } = req.body

  const newData = {}
  if (name) newData.name = name
  if (email) newData.email = email
  if (age) newData.age = age
  if (aboutMe) newData.aboutMe = aboutMe

  try {
    let user = await Users.findByIdAndUpdate(req.user.id, newData, { select: "-password" })
    res.json(user);
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router