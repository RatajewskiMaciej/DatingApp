import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import io from 'socket.io-client';
import { getUser, getChat } from "../../../redux/actions/usersAction"
import { useSelector, useDispatch } from "react-redux"

const useStyles = makeStyles((theme) => ({
  messageList: {
    backgroundImage:
      'url(https://www.toptal.com/designers/subtlepatterns/patterns/email-pattern.png)',
    padding: 20,
    overflow: 'auto',
    flexGrow: 1,
  },
  bubbleContainer: { clear: 'both' },
  bubbleLeft: {
    float: 'left',
    color: 'white',
    position: 'relative',
    background: theme.palette.secondary.dark,
    borderRadius: '.4em',
    margin: '5px',
    marginBottom: '20px',
    padding: '20px',
    maxWidth: '70%',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      width: 0,
      height: 0,
      border: '8px solid transparent',
      borderRightColor: theme.palette.secondary.dark,
      borderLeft: 0,
      marginTop: '-8px',
      marginLeft: '-8px',
    },
  },
  bubbleRight: {
    float: 'right',
    color: 'white',
    position: 'relative',
    background: theme.palette.primary.main,
    borderRadius: '.4em',
    margin: '5px',
    marginBottom: '20px',
    padding: '20px',
    maxWidth: '70%',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 0,
      height: 0,
      border: '8px solid transparent',
      borderLeftColor: theme.palette.primary.main,
      borderRight: 0,
      marginTop: '-8px',
      marginRight: '-8px',
    },
  },
  textIdRight: {
    color: 'black',
    position: 'absolute',
    bottom: -20,
    right: 10,
    display: 'block',
  },
  textIdLeft: {
    color: 'black',
    position: 'absolute',
    bottom: -20,
    left: 10,
    display: 'block',
  },
}))

let socket;

const MessageList = ({ messages }) => {
  const classes = useStyles()
  socket = io('http://localhost:5000');
  const userChat = useSelector(state => state.users.userChat)
  const user = useSelector(state => state.users.user)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getChat(userChat._id))
    socket.on('Output Chat Messages', (data) => {
      console.log(data);
    })
  }, [userChat]);

  let chatMessages = useSelector(state => state.users.chat)


  // Scroll to bottom
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  // Create chat bubbles
  const bubblePicker = (senderId) => {
    if (senderId === user.first_name) return classes.bubbleRight
    return classes.bubbleLeft
  }
  const sidePicker = (senderId) => {
    if (senderId === user.first_name) return classes.textIdRight
    return classes.textIdLeft
  }

  return (
    <Box className={classes.messageList}>
      {userChat.first_name ? chatMessages.messages.map(message => (
        <Box key={Math.random()} className={classes.bubbleContainer}>
          <Box className={bubblePicker(message.login)}>
            <Typography variant="body1">{message.message}</Typography>
            <Typography
              variant="body2"
              className={sidePicker(message.login)}
            >
              {message.login}
            </Typography>
          </Box>
        </Box>
      )) : <Box key={Math.random()} >
          <Box >
            <Typography variant="body1"></Typography>
            <Typography
              variant="body2"

            >
            </Typography>
          </Box>
        </Box>}
      <div ref={endRef} style={{ clear: 'both' }} />
    </Box>
  )
}

export default MessageList
