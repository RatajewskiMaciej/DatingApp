import React, { useState } from 'react'

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

const ComposeBox = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [message, setMessage] = useState()

  const sendMessage = () => {
    setMessage('')

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
              onClick={() => sendMessage()}
            >
              <SendIcon
                fontSize="large"
                style={message ? { color: theme.palette.primary.main } : null}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ComposeBox
