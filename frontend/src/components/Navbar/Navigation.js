import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../data/logo.png'
import logotextWhite from '../../data/logotext_white.png'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Tooltip,
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'
import PeopleIcon from '@material-ui/icons/People'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import SettingsPage from '../LandingPage/SettingsPage'
import ChatPage from '../LandingPage/ChatPage'
import MeetPage from '../LandingPage/MeetPage'
import ProfilePage from '../LandingPage/ProfilePage'
import StepsPage from '../LandingPage/StepsPage'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Navigation() {
  const classes = useStyles()

  const [page, setPage] = useState(<ProfilePage />)

  const navBar = (
    <Box className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} height="50px" alt="Loveli logo" onClick={() => setPage(<MeetPage />)} className="logo"/>
            <img src={logotextWhite} height="42px" alt="Loveli" onClick={() => setPage(<MeetPage />)} className="logo"/>
          </Typography>

          {/* Profile creation page (testing) */}
          <Tooltip title="Tworzenie konta (TEST)">
            <IconButton color="inherit" onClick={() => setPage(<StepsPage />)}>
              <PeopleIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Odkrywaj">
            <IconButton color="inherit" onClick={() => setPage(<MeetPage />)}>
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Czat">
            <IconButton color="inherit" onClick={() => setPage(<ChatPage />)}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profil">
            <IconButton
              color="inherit"
              onClick={() => setPage(<ProfilePage />)}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ustawienia">
            <IconButton
              color="inherit"
              onClick={() => setPage(<SettingsPage />)}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Wyloguj">
            <IconButton color="inherit" onClick={() => setPage()}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )

  return (
    <>
      {navBar}
      <Box className="reactBody">
        <Container maxWidth={'lg'} disableGutters>
          {page}
        </Container>
      </Box>
    </>
  )
}
