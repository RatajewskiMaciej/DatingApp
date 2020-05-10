import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import logotextBlack from '../../data/logotext_black.png'
import { getToken } from '../../redux/actions/logActions';


import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <img src={logotextBlack} alt="Loveli" style={{ height: '1.2em' }} />{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage:
      'url(https://isorepublic.com/wp-content/uploads/2018/11/couple-in-love-1100x733.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    height: theme.spacing(6)
  }
}))

export default function SignIn() {
  const dispatch = useDispatch();

  const classes = useStyles()
  // const [registerError, setRegisterError] = useState('')
  const [loginError, setLoginError] = useState('');

  let [data, setData] = useState({
    email: '',
    password: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data.token) {
        localStorage.setItem('usertoken', (res.data.token));
        dispatch(getToken());
      }
      else {
        setLoginError(res.data.msg);
      }
    }
    catch (error) {
      setLoginError("Please write correct email or password");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square style={{ padding: 20 }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <div>{loginError ? loginError : 'Zaloguj się!'}</div>
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Adres Email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={e => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Haslo"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={e => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />{' '}
              </Grid>
            </Grid>
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
            </Button>
            <Box mt={5}>
              <Link to="/register">Nie masz konto? Zarejestruj sie!!</Link>
            </Box>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
