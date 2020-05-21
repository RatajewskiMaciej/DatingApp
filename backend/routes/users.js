const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");


const auth = require('../middleware/auth.js');
const User = require('../models/Users.js');
const upload = require("../middleware/uploads.js");
const { sendEmail } = require("./mail")

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

router.put("/profile", [auth, upload], async (req, res) => {

  const user = await User.findById(req.user.id)

  console.log(req.body)
  try {
    const { description, name, age, email, locationPreference, ageRangePreference, genderPreferenceMale, genderPreferenceFemale, avatar } = req.body

    console.log(req.body)

    description ? user.description = description : null;
    name ? user.first_name = name : null;
    age ? user.age = age : null;
    email ? user.email = email : null;
    locationPreference ? user.city = locationPreference : null;
    ageRangePreference ? user.ageRange = ageRangePreference : null;
    genderPreferenceFemale ? user.genderPreferenceFemale = true : user.genderPreferenceFemale = false;
    genderPreferenceMale ? user.genderPreferenceMale = true : user.genderPreferenceMale = false;
    req.file ? user.avatars.push(req.file.path) : null
    avatar ? user.avatar = avatar : null

    user.save()

    return res.json({
      msg: "Dane uytkownika zaktualizowane poprawnie!",
      user: user
    })

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


    return res.json(user)

  } catch (err) {
    console.log(err.message)
  }

})

//delete user

router.delete("/user", [auth], async (req, res) => {
  const user = await User.findByIdAndRemove(req.user.id)

})

router.put("/password", [auth], async (req, res) => {
  const user = await User.findById(req.user.id)
  try {
    const {
      oldPass,
      newPass,
      repeatPass
    } = req.body

    const match = await bcrypt.compare(oldPass, user.password)

    if (!match) {
      return res.json({ msg: "Email or Password is incorrect" })
    }
    else {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPass, salt);

      user.password = hash

      return res.json({ msg: "Haslo zmienione poprawnie!" })
    }

  } catch (error) {
    console.log(err.message)

  }
})


//send email

router.post("/send", [auth], (req, res) => {

  sendEmail(req.body.email, req.user.id)

  return res.json({ msg: "Email wysłany" })

})


//send questions

router.post("/questions", [auth], async (req, res) => {
  const user = await User.findById(req.user.id)

  try {
    user.res1 = req.body.res1
    user.res2 = req.body.res2
    user.res3 = req.body.res3
    user.res4 = req.body.res4
    user.res5 = req.body.res5
    user.res6 = req.body.res6
    user.res7 = req.body.res7
    user.res8 = req.body.res8
    user.res9 = req.body.res9
    user.res10 = req.body.res10
    user.res11 = req.body.res11
    user.res12 = req.body.res21

    user.save()

  } catch (error) {
    console.log(err.message)
  }
})

//blocked User

router.post("/blocked", [auth], async (req, res) => {
  const user = await User.findById(req.user.id)

  try {
    if (req.body.user.first_name) user.blockedUser.push(req.body.user)

    user.save()

  } catch (error) {
    console.log(err.message)
  }
})

//unblock User

router.put("/unblock", [auth], async (req, res) => {

  const user = await User.findById(req.user.id)

  try {
    user.blockedUser = user.blockedUser.filter((blockUser) => {
      return blockUser.email !== req.body.user.email
    })

    user.save()

    return res.json(user.blockedUser)

  } catch (error) {
    console.log(err.message)

  }
})


module.exports = router