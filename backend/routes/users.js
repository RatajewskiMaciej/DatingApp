const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.js');
const User = require('../models/Users.js');
const upload = require("../middleware/uploads.js");

//get user who login

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
})

//get users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select("-password")
    return res.json(users)
  } catch (err) {
    console.log(err.message)
  }
})

//get profile
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    return res.json(user)
  } catch (err) {
    console.log(err.message)
  }
})


//update user data

router.put("/profile", auth, async (req, res) => {

  const user = await User.findById(req.user.id)

  try {
    const { description, name, age, email, locationPreference, ageRangePreference, genderPreferenceMale, genderPreferenceFemale, avatar } = req.body

    description ? user.description = description : null;
    name ? user.first_name = name : null;
    age ? user.age = age : null;
    email ? user.email = email : null;
    locationPreference ? user.city = locationPreference : null;
    ageRangePreference ? user.ageRange = ageRangePreference : null;
    genderPreferenceFemale ? user.gender = "female" : null;
    genderPreferenceMale ? user.gender = "male" : null;
    avatar ? user.avatar = avatar : null;

    user.save()

    // console.log(user)

    return res.json({ msg: "User data have already updated" })

  } catch (err) {
    console.log(err.message)
  }


})

//upload file
router.post("/profile/uploads", [auth, upload], async (req, res) => {

  const user = await User.findById(req.user.id)

  try {
    if (req.file) {
      user.avatar = req.file.path
    }
    user.save()


    return res.json({ msg: "User data have already updated" })

  } catch (err) {
    console.log(err.message)
  }

})


module.exports = router