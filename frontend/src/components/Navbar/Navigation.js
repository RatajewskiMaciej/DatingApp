import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import logo from '../../data/logo.png'
import logotextWhite from '../../data/logotext_white.png'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Hidden,
  Badge,
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { removeToken } from '../../redux/actions/logActions'
import setAuthToken from '../../middleware/setAuthToken'

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
  active: {
    backgroundColor: '#3949a8',
  },
}))

export default function Navigation() {
  const dispatch = useDispatch()

  const token = localStorage.getItem('usertoken')
  useEffect(() => {
    if (token) setAuthToken(token)
  }, [token])

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
                className="logo"
              />

              <Hidden xsDown>
                <img
                  src={logotextWhite}
                  height="42px"
                  alt="Loveli"
                  className="logo"
                />
              </Hidden>
            </Link>
          </Typography>

          <Tooltip title="Odkrywaj">
            <Link to="/profil" className={classes.link}>
              <IconButton
                color="inherit"
                className={location === '/profil' ? classes.active : null}
              >
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Czat">
            <Link to="/czat" className={classes.link}>
              <IconButton
                color="inherit"
                className={location === '/czat' ? classes.active : null}
              >
                <Badge
                  color="secondary"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <ChatIcon />
                </Badge>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Ustawienia">
            <Link to="/ustawienia" className={classes.link}>
              <IconButton
                color="inherit"
                className={location === '/ustawienia' ? classes.active : null}
              >
                <SettingsIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Wyloguj">
            <Link to="/" className={classes.link}>
              <IconButton
                color="inherit"
                onClick={() => dispatch(removeToken())}
              >
                <ExitToAppIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
