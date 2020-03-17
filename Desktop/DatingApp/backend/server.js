const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000
const register = require('./routes/register')
const login = require('./routes/login')
const profile = require('./routes/profile')


mongoose.connect('mongodb://localhost:27017/loginAuth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err.message))

app.use(express.json());
app.use(cors());

app.use('/add', register);
app.use('/login', login);
app.use('/profile', profile)


app.listen(PORT, () => console.log("Server is running on port: " + PORT))