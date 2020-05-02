import React from 'react'

import {
  Grid,
  Avatar,
  Typography,
  Divider,
  Button,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

//Dummy user data
import chatData from '../../../data/chatData'
import userData from '../../../data/userData'
const profileImage = userData.images.filter((image) => image.profile)[0].src
// ***

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    height: '70px',
    width: '100%',
    overflow: 'hidden',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textWrapper: {
    overflow: 'hidden',
  },
  buttonText: {
    marginLeft: '1em',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
}))

const ChatLeftPane = () => {
  const classes = useStyles()

  const button = (
    <>
      <Button className={classes.button}>
        <Avatar src={profileImage} className={classes.avatar} />
        <Box className={classes.textWrapper}>
          <Typography noWrap className={classes.buttonText}>
            <b>Aga</b>, 27
          </Typography>
          <Typography noWrap className={classes.buttonText}>
            {chatData.filter((msg) => msg.senderId !== 'Ja').pop().text}
          </Typography>
        </Box>
      </Button>
      <Divider />
    </>
  )

  return (
    <Box className={classes.root}>
      <Box>
        {button}
        {button}
        {button}
        {button}
        {button}
        {button}
        {button}
        {button}
        {button}
      </Box>
    </Box>
  )
}

export default ChatLeftPane
