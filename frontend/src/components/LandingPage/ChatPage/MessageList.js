import React from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import chatData from '../../../data/chatData'

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

const MessageList = () => {
  const classes = useStyles()

  const bubblePicker = (senderId) => {
    if (senderId === 'Ja') return classes.bubbleRight
    return classes.bubbleLeft
  }
  const sidePicker = (senderId) => {
    if (senderId === 'Ja') return classes.textIdRight
    return classes.textIdLeft
  }

  return (
    <Box className={classes.messageList}>
      {chatData.map((message, index) => (
        <Box key={index} className={classes.bubbleContainer}>
          <Box className={bubblePicker(message.senderId)}>
            <Typography variant="body1">{message.text}</Typography>
            <Typography
              variant="body2"
              className={sidePicker(message.senderId)}
            >
              {message.senderId}
            </Typography>
          </Box>
        </Box>
      ))}
      <div style={{ clear: 'both' }} />
    </Box>
  )
}

export default MessageList
