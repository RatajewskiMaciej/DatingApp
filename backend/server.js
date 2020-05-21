const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const register = require('./routes/register')
const login = require('./routes/login')
const user = require("./routes/users")
const chat = require("./routes/chat")
const app = express();


const server = http.createServer(app);
const io = socketio(server);

//Database connection
const mongoURI = config.get('mongoURI');

const connect = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//extra
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("/uploads", express.static("uploads"))


//routing
app.use('/register', register)
app.use('/login', login)
app.use("/user", user)
app.use("/chat", chat)

const Chat = require("./models/Chat");

io.on("connection", socket => {

  socket.on("sendMessage", msg => {

    connect.then(async db => {
      const message = msg.messages.message
      const login = msg.messages.login
      const mainUser = msg.sendersID[0]
      const selectedUser = msg.sendersID[1]
      try {
        const chat = await Chat.findOne({ sendersID: mainUser, sendersID: selectedUser })
        if (selectedUser) {
          if (chat) {
            chat.messages.push({ message: message, login: login })
            await chat.save()


          } else {
            const payload = {
              sendersID: [mainUser, selectedUser],
              messages: {
                idAuthor: mainUser,
                message: message
              }
            }
            let newMessage = new Chat(payload)
            await newMessage.save()
          }

        }
        // let chat = Chat.find({ sendersID: msg.sendersID[0], sendersID: msg.sendersID[1] })
        // if (!chat.sendersID[1]) { chat = new Chat(msg) }
        // chat.messages.unshift({ message: message, login: login })

        // console.log(chat)
        // // let chat = new Chat(msg)

        // chat.save((err, doc) => {
        //   if (err) return res.json({ success: false, err })
        // })
        // Chat.findOne({ sendersID: doc.sendersID })
        //   .populate("sendersID")
        //   .exec((err, doc) => {
        //     console.log(doc)
        //     return io.emit("Output Chat Messages", doc);
        //   })

      } catch (error) {
        console.error(error);
      }
    })
  })

})
//Server running
const PORT = process.env.PORT || 5000
server.listen(PORT, () => { console.log(`Server is runnign on port: ${PORT}`) })