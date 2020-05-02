import React from 'react'
import {
  Grid,
  Hidden,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
  },
}))

const ChatHeader = (props) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Hidden mdUp>
            <IconButton onClick={props.onClick}>
              <ArrowBackIosIcon fontSize="large" />
            </IconButton>
          </Hidden>
        </Grid>
        <Grid item className={classes.header}>
          <Typography variant="h5" align="center">
            <b>Aga</b>, 27
          </Typography>
          <Typography color="secondary">Dopasowanie: 98%</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <Divider />
    </>
  )
}

export default ChatHeader
