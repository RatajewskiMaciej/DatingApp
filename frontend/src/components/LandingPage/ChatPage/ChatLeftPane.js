import React, { useState, useEffect } from 'react'

import {
  Avatar,
  Typography,
  Divider,
  Button,
  Box,
  InputBase,
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

import { useDispatch, useSelector } from "react-redux"
import { getUser, getUsers, userChat } from "../../../redux/actions/usersAction"


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
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
  searchContainer: {
    height: '70px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: '90%',
    padding: '10px',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.075),
    },
  },
  searchIcon: {
    height: '100%',
  },
  clearIcon: {
    height: '100%',
    cursor: 'pointer',
  },
  searchInput: {
    height: '100%',
    flexGrow: 1,
  },
}))

const ChatLeftPane = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser())
  }, [])
  const [search, setSearch] = useState()

  const userAuth = useSelector(state => state.users.user)
  const users = useSelector(state => state.users.users)
  const { blockedUser } = userAuth

  const r = users.filter((elem) => !blockedUser.find(({ email }) => elem.email === email));

  const button = (
    <>
      {r.filter(user => (user._id !== userAuth._id) && (search ? user.first_name.includes(search) : true))
        .map(profile => (
          <div div key={Math.random()} onClick={() => { dispatch(userChat(profile)) }}>
            <Button className={classes.button} >
              <Avatar src={`http://localhost:5000/${profile.avatar}`} className={classes.avatar} />
              <Box className={classes.textWrapper}>
                <Typography noWrap className={classes.buttonText}>
                  <b>{profile.first_name}</b>, {profile.age}
                </Typography>
              </Box>
            </Button>
            <Divider />
          </div>
        ))
      }
    </>
  )

  const searchBox = (
    <>
      <Box className={classes.searchContainer}>
        <Box className={classes.search}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            value={search}
            className={classes.searchInput}
            placeholder="Szukaj..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search ? (
            <ClearIcon
              className={classes.clearIcon}
              onClick={() => setSearch('')}
            />
          ) : null}
        </Box>
      </Box>
      <Divider />
    </>
  )

  return (
    <Box className={classes.root}>
      {searchBox}
      {button}
    </Box>
  )
}

export default ChatLeftPane
