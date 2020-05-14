import React, {useState} from 'react'
import {
  Grid,
  Hidden,
  IconButton,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Box
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70px',
  },
}))

const ChatHeader = (props) => {

  const [anchorEl, setAnchorEl] = useState()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Hidden mdUp>
            <IconButton onClick={props.onClick}>
              <ArrowBackIosIcon fontSize="large" />
            </IconButton>
          </Hidden>
        </Grid>
        <Grid item>
          <Typography variant="h5" align="center">
            <b>Aga</b>, 27
          </Typography>
          <Typography color="secondary">Dopasowanie: 98%</Typography>
        </Grid>
        <Grid item>
        <IconButton onClick={handleClick}>
            <MoreVertIcon fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose()
                alert('Zgłoszono!')
              }}
            >
              Zgłoś
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                alert('Zablokowano!')
              }}
            >
              Zablokuj
            </MenuItem>
          </Menu>

        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default ChatHeader
