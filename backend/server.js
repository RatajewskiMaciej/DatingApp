const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const register = require('./routes/register')
const login = require('./routes/login')
const user = require("./routes/users")
const app = express();


const server = http.createServer(app);
const io = socketio(server);

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


io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('sendMessage', (data) => {
    console.log(data);
  });
});

//Server running
const PORT = process.env.PORT || 5000
server.listen(PORT, () => { console.log(`Server is runnign on port: ${PORT}`) })