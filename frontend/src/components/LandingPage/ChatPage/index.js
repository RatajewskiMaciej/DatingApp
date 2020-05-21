import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ComposeBox from './ComposeBox'
import ChatLeftPane from './ChatLeftPane'
import io from 'socket.io-client';

import { Paper, Grid, Hidden, Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { getChat } from "../../../redux/actions/usersAction"




const useStyles = makeStyles((theme) => ({
  paperLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: 'calc(100vh - 65px)',
    overflow: 'auto',
  },
  paperRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 'calc(100vh - 65px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const ChatPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const userChat = useSelector(state => state.users.userChat)

  useEffect(() => {
    dispatch(getChat(userChat._id))
  }, [userChat])

  const chat = useSelector(state => state.users.chat)

  const [extend, setExtend] = useState()
  const handleExtend = () => {
    setExtend(!extend)
  }

  // const socket = io('http://localhost:5000');
  // socket.on('news', (data) => {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'data' });
  // });

  return smDown ? (
    extend ? (
      <Box>
        <Paper className={classes.paperRight}>
          <ChatLeftPane />
        </Paper>
      </Box>
    ) : (
        <Box>
          <Paper className={classes.paperRight}>
            <ChatHeader />
            {chat ? <MessageList /> : null}
            <ComposeBox />
          </Paper>
        </Box>
      )
  ) : (
      <Grid container>
        <Hidden smDown>
          <Grid item md={4}>
            <Paper className={classes.paperLeft}>
              <ChatLeftPane />
            </Paper>
          </Grid>
        </Hidden>

        <Grid item md={8}>
          <Paper className={classes.paperRight}>
            <ChatHeader />
            {chat ? <MessageList /> : null}
            <ComposeBox />
          </Paper>
        </Grid>
      </Grid>
    )
}

export default ChatPage
