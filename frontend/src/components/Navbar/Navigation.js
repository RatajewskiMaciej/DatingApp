import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../data/logo.png'
import logotextWhite from '../../data/logotext_white.png'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'
import PeopleIcon from '@material-ui/icons/People'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    width: '100%',
  },
  link: {
    color: 'inherit',
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
  const location = useLocation().pathname

  return (
    <Box className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <img
                src={logo}
                height="50px"
                alt="Loveli logo"
                onClick={() => console.log(location)}
                className="logo"
              />
              <img
                src={logotextWhite}
                height="42px"
                alt="Loveli"
                onClick={() => console.log(location)}
                className="logo"
              />
            </Link>
          </Typography>

          <Tooltip title="Odkrywaj">
            <Link to="/odkrywaj" className={classes.link}>
              <IconButton color="inherit" onClick={() => console.log(location)}>
                <PeopleIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Czat">
            <Link to="/czat" className={classes.link}>
              <IconButton color="inherit" onClick={() => console.log(location)}>
                <ChatIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Profil">
            <Link to="/profil" className={classes.link}>
              <IconButton color="inherit" onClick={() => console.log(location)}>
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Ustawienia">
            <Link to="/ustawienia" className={classes.link}>
              <IconButton color="inherit" onClick={() => console.log(location)}>
                <SettingsIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Wyloguj">
            <Link to="/wyloguj" className={classes.link}>
              <IconButton color="inherit" onClick={() => console.log(location)}>
                <ExitToAppIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
