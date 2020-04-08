import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logo
          </Typography>
          <IconButton color="inherit">
              <PeopleIcon fontSize="large"/>
          </IconButton>
          <IconButton color="inherit">
              <ChatIcon  fontSize="large"/>
          </IconButton>
          <IconButton color="inherit">
              <AccountCircleIcon  fontSize="large"/>
          </IconButton>
          <IconButton color="inherit">
              <SettingsIcon  fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}