import React, { useState } from 'react'
import logotextBlack from '../../data/logotext_black.png'
import { Link } from 'react-router-dom'

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
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

const useStyles = makeStyles((theme) => ({
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
  container: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    height: theme.spacing(6),
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const [registerError, setRegisterError] = useState('')
  let [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    privacy: false,
  })
  const onClick = async (e) => {
    e.preventDefault()

    const res = await axios.post('http://localhost:5000/register', data)
    setRegisterError(res.data.msg)
    if (res.data.msg === 'You have registered') {
      console.log(data)
      setData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        privacy: false,
      })
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={6} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.container}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <div>{registerError ? registerError : 'Załóż konto'}</div>
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Imię"
                  autoFocus
                  value={data.first_name}
                  onChange={(e) => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nazwisko"
                  name="last_name"
                  autoComplete="lname"
                  value={data.last_name}
                  onChange={(e) => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Adres email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => {
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
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Potwierdź hasło"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setData({ ...data, [e.target.name]: e.target.value })
                  }}
                />
                <FormControlLabel
                  label={<Link to="/prywatnosc">Akceptuję politykę prywatności i regulamin*</Link>}
                  style={{ marginTop: '15px' }}
                  control={
                    <Checkbox
                      checked={data.privacy}
                      name="privacy"
                      required
                      onChange={(e) => {
                        setData({ ...data, [e.target.name]: !data.privacy })
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Załóż konto
            </Button>
            <Box mt={5}>
              <Link to="/">Zaloguj się!</Link>
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
