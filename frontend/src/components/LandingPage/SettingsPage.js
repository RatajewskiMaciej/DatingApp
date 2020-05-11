import React, { useState } from 'react'
import {
  Typography,
  Paper,
  Box,
  Button,
  Slider,
  Select,
  Link,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  useMediaQuery,
  ButtonGroup,
  Divider,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import userData from '../../data/userData'
import Questions from './StepsPage/Questions'

import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

import axios from 'axios'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    minWidth: '180px',
    width: '50%',
  },
  menu: {
    marginTop: theme.spacing(1),
    marginBot: theme.spacing(1),
  },
  clickableRow: {
    minHeight: theme.spacing(7),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#eee',
    },
  },
  buttonGroup: {
    height: theme.spacing(6),
  },
}))

const SettingsPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const user = useSelector((state) => state.users.user)

  // User profile data
  const city = userData.city
  const [name, setName] = useState(user.first_name)
  const [age, setAge] = useState(user.age)
  const [email, setEmail] = useState(user.email)

  // User preferences
  const [locationPreference, setLocationPreference] = useState(
    user.locationPreference
      ? user.locationPreference
      : userData.preferences.location
  )
  const [genderPreferenceMale, setGenderPreferenceMale] = useState(
    user.genderPreferenceMale
      ? user.genderPreferenceMale
      : userData.preferences.gender.male
  )
  const [genderPreferenceFemale, setGenderPreferenceFemale] = useState(
    user.genderPreferenceFemale
      ? user.genderPreferenceFemale
      : userData.preferences.gender.female
  )
  const [ageRangePreference, setAgeRangePreference] = useState(
    user.ageRangePreference
      ? user.ageRangePreference
      : userData.preferences.ageRange
  )

  // Preference edit handlers
  const handleAgeRangeSlider = (event, newAgeRange) => {
    setAgeRangePreference(newAgeRange)
  }
  const handleGenderPreferenceMale = (event) => {
    setGenderPreferenceMale(!genderPreferenceMale)
  }
  const handleGenderPreferenceFemale = (event) => {
    setGenderPreferenceFemale(!genderPreferenceFemale)
  }
  const handleLocationPreference = (event) => {
    setLocationPreference(event.target.value)
  }

  const payload = {
    name,
    age,
    email,
    locationPreference,
    genderPreferenceFemale,
    genderPreferenceMale,
    ageRangePreference,
  }
  const onClick = async () => {
    await axios.put('http://localhost:5000/user/profile', payload)
  }

  // Age options for age select
  const ageOptions = (select) => {
    let options = []
    for (let i = 18; i < 70; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      )
    }
    options.push(
      <option value={70} key={70}>
        70+
      </option>
    )
    return options
  }

  // Menu states
  const [menu, setMenu] = useState('main')
  const [conf, setConf] = useState(false)

  const accountSettings = (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.title}>
        <SettingsIcon />
        Ustawienia konta
      </Typography>

      {menu === 'main' ? (
        <form>
          <Grid container spacing={2} alignItems="stretch" direction="column">
            <Grid item>
              <TextField
                value={name}
                name="name"
                id="username"
                onChange={(event) => setName(event.target.value)}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Imię"
                autoFocus
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel>Wiek</InputLabel>
                <Select
                  native
                  value={age}
                  name="age"
                  id="userage"
                  onChange={(event) => setAge(event.target.value)}
                  label="wiek"
                >
                  {ageOptions()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                autoComplete="email"
                value={email}
                name="email"
                id="useremail"
                onChange={(event) => setEmail(event.target.value)}
                variant="outlined"
                fullWidth
                label="Adres email"
                autoFocus
              />
            </Grid>
          </Grid>
        </form>
      ) : (
        <form>
          <Grid container spacing={2} alignItems="stretch" direction="column">
            <Grid item>
              <TextField
                value={null}
                name="oldPass"
                id="oldPass"
                onChange={null}
                variant="outlined"
                fullWidth
                label="Stare hasło"
              />
            </Grid>
            <Grid item>
              <TextField
                value={null}
                name="newPass"
                id="newPass"
                onChange={null}
                variant="outlined"
                fullWidth
                label="Nowe hasło"
              />
            </Grid>
            <Grid item>
              <TextField
                value={null}
                name="repeatPass"
                id="repeatPass"
                onChange={null}
                variant="outlined"
                fullWidth
                label="Powtórz nowe hasło"
              />
            </Grid>
          </Grid>
        </form>
      )}

      <Box className={classes.menu}>
        {menu === 'pass' ? (
          <>
            <Box
              className={classes.clickableRow}
              onClick={() => setMenu('main')}
            >
              <Link
                href="#"
                // onClick={() => alert('send change password email')}
              >
                <Typography>Ustawienia podstawowe</Typography>
              </Link>
            </Box>
            <Divider />
          </>
        ) : (
          <>
            <Box
              className={classes.clickableRow}
              onClick={() => setMenu('pass')}
            >
              <Link
                href="#"
                // onClick={() => alert('send change password email')}
              >
                <Typography>Zmień hasło</Typography>
              </Link>
            </Box>
            <Divider />
          </>
        )}

        <Box className={classes.clickableRow} onClick={() => setConf(!conf)}>
          {conf ? (
            <>
              <Typography color="secondary">
                Na pewno chcesz usunąć swoje konto?
              </Typography>
              <Box style={{ display: 'flex' }}>
                <Link
                  color="secondary"
                  href="#"
                  onClick={() => alert('delete account popup')}
                >
                  <Typography>Tak</Typography>
                </Link>
                <span> / </span>
                <Link color="primary" href="#">
                  <Typography>Anuluj</Typography>
                </Link>
              </Box>
            </>
          ) : (
            <Link
              href="#"
              // onClick={() => alert('delete account popup')}
            >
              <Typography>Usuń konto</Typography>
            </Link>
          )}
        </Box>
        <Divider />
      </Box>

      <Button
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Zapisz zmiany
      </Button>
    </Paper>
  )

  const preferenceSettings = (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom className={classes.title}>
        <SearchIcon />
        Preferencje
      </Typography>

      <form>
        <Grid container spacing={2} alignItems="stretch" direction="column">
          <Grid item>
            <ButtonGroup fullWidth className={classes.buttonGroup}>
              <Button
                value="male"
                onClick={() => handleGenderPreferenceMale()}
                color={genderPreferenceMale === 'male' ? 'primary' : null}
                variant={genderPreferenceMale === 'male' ? 'contained' : null}
              >
                Mężczyzni
              </Button>
              <Button
                value="female"
                onClick={() => handleGenderPreferenceFemale()}
                color={genderPreferenceFemale === 'female' ? 'secondary' : null}
                variant={
                  genderPreferenceFemale === 'female' ? 'contained' : null
                }
              >
                Kobiety
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Typography>Wiek:</Typography>
            <Slider
              value={ageRangePreference}
              onChange={handleAgeRangeSlider}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              style={{ width: '100%', paddingTop: '60px' }}
              min={18}
              max={70}
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel>Z</InputLabel>
              <Select
                native
                value="Wrocław"
                onChange={handleLocationPreference}
                label="wiek"
              >
                <option value="local">{city}</option>
                <option value="global">Cały kraj</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>

      <Button
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Zapisz zmiany
      </Button>
    </Paper>
  )

  const questionSettings = (
    <Paper className={classes.paper}>
      <Questions ids={[1, 12]} />
      <Button
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Zapisz zmiany
      </Button>
    </Paper>
  )

  return useMediaQuery(theme.breakpoints.up('md')) ? (
    <Grid container>
      <Grid item xs={12} md={6}>
        {accountSettings}
        {preferenceSettings}
      </Grid>
      <Grid item xs={12} md={6}>
        {questionSettings}
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={12} md={6}>
        {accountSettings}
      </Grid>
      <Grid item xs={12} md={6}>
        {preferenceSettings}
      </Grid>
      <Grid item xs={12} md={6}>
        {questionSettings}
      </Grid>
    </Grid>
  )
}

export default SettingsPage
