const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const register = require('./routes/register')
const login = require('./routes/login')
const user = require("./routes/users")
const app = express();


//Database connection
const mongoURI = config.get('mongoURI');
mongoose.connect(
  mongoURI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB connected")
  }
);



//extra
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("/uploads", express.static("uploads"))


//routing
app.use('/register', register)
app.use('/login', login)
app.use("/user", user)


//Server running
const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Server is runnign on port: ${PORT}`) })