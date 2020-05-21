import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux"
import { getUser, getChat, addMessage } from "../../../redux/actions/usersAction"


import {
  Divider,
  Grid,
  IconButton,
  TextField,
  Paper,
  Tooltip,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  composeBox: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  textField: {
    padding: 10,
  },
  sendIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
}))

let socket;

const ComposeBox = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  socket = io('http://localhost:5000');



  useEffect(() => {
    dispatch(getUser())
    socket.on('news', (data) => {
      console.log(data);
    })
    dispatch(getChat(userChat._id))

  }, [getChat, getUser]);

  const userChat = useSelector(state => state.users.userChat)
  const user = useSelector(state => state.users.user)


  const [message, setMessage] = useState("")


  const sendMessage = (event) => {
    if (message) {
      socket.emit('sendMessage', {
        sendersID: [user._id, userChat._id],
        messages: {
          message: message,
          login: user.first_name
        }
      });
      dispatch(addMessage({
        message: message,
        login: user.first_name
      }))
      dispatch(getChat(userChat._id))
      setMessage('')
    }
  }


  return (
    <Paper className={classes.composeBox}>
      <Divider />
      <Grid container>
        <Grid item xs={11}>
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            rows={4}
            placeholder="Napisz wiadomość..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} style={{ position: 'relative' }}>
          <Tooltip title="Wyślij">
            <IconButton
              className={classes.sendIcon}
              onClick={() => { sendMessage(); setMessage("") }}
            >
              <SendIcon
                fontSize="large"
                style={message ? { color: theme.palette.primary.main } : null}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper >
  )
}

export default ComposeBox
