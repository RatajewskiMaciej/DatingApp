import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

import { useDispatch, useSelector } from "react-redux"
import { getUser, getUsers } from "../../../redux/actions/usersAction"
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const user = useSelector(state => state.users.user)
  const userChat = useSelector(state => state.users.userChat)


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
          {userChat.first_name ?
            <>
              <Typography variant="h5" align="center">
                <b>{userChat.first_name}</b>, {userChat.age}
              </Typography>
              <Typography color="secondary">Dopasowanie: {userChat.match}</Typography>
            </>
            : null}
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
                alert('Zgłoś naruszenie regulaminu w podpunkcie feedback!')
              }}
            >
              <Link to="ustawienia">
                Zgłoś</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                axios.post("http://localhost:5000/user/blocked", { user: userChat })
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
