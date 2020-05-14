import React, { useState } from 'react'

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

//Dummy user data
import chatData from '../../../data/chatData'
import userData from '../../../data/userData'
const profileImage = userData.images.filter((image) => image.profile)[0].src
// ***

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
  const classes = useStyles()
  const [search, setSearch] = useState()
  // TO DO SEARCH FILTERING

  const button = (
    <>
      <Button className={classes.button} onClick={props.onClick}>
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
      {button}
      {button}
      {button}
      {button}
      {button}
      {button}
      {button}
      {button}
    </Box>
  )
}

export default ChatLeftPane
