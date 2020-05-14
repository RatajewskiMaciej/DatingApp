import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ComposeBox from './ComposeBox'
import ChatLeftPane from './ChatLeftPane'

import { Paper, Grid, Hidden, Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
  const classes = useStyles()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [extend, setExtend] = useState()
  const handleExtend = () => {
    setExtend(!extend)
  }

  return smDown ? (
    extend ? (
      <Box>
        <Paper className={classes.paperRight}>
          {/* <ChatHeader onClick={handleExtend} /> */}
          <ChatLeftPane onClick={handleExtend}/>
        </Paper>
      </Box>
    ) : (
      <Box>
        <Paper className={classes.paperRight}>
          <ChatHeader onClick={handleExtend} />
          <MessageList />
          <ComposeBox />
        </Paper>
      </Box>
    )
  ) : (
    <Grid container>
      <Hidden smDown>
        <Grid item md={4}>
          <Paper className={classes.paperLeft}>
            <ChatLeftPane onClick={handleExtend}/>
          </Paper>
        </Grid>
      </Hidden>

      <Grid item md={8}>
        <Paper className={classes.paperRight}>
          <ChatHeader onClick={handleExtend} />
          <MessageList />
          <ComposeBox />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ChatPage
