import React, { useState, useEffect } from 'react'
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
  Input,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import userData from '../../data/userData'
import Questions from './StepsPage/Questions'

import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'




import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getUser, deleteUser } from '../../redux/actions/usersAction'
import { removeToken } from '../../redux/actions/logActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: '2vh',
    },
    overflow: 'hidden',
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
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  useEffect(() => {
    dispatch(getUser())
  }, [getUser])

  const user = useSelector((state) => state.users.user)

  // User profile data
  const city = userData.city
  const [name, setName] = useState(user.first_name)
  const [age, setAge] = useState(user.age)
  const [email, setEmail] = useState(user.email)

  // User preferences
  const [locationPreference, setLocationPreference] = useState(user.city)
  const [genderPreferenceMale, setGenderPreferenceMale] = useState(false)
  const [genderPreferenceFemale, setGenderPreferenceFemale] = useState(false)
  const [ageRangePreference, setAgeRangePreference] = useState(user.ageRange)

  useEffect(() => {
    setLocationPreference(user.city)
    setName(user.first_name)
    setAge(user.age)
    setEmail(user.email)
    setAgeRangePreference(user.ageRange)
  }, [user])

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
    console.log(event.target.value)
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
  const [responseSettingsUpdate, setResponseSettingsUpdate] = useState("")
  const [responsePreference, setResponsePreference] = useState("")


  const onClick = async () => {
    const res = await axios.put('http://localhost:5000/user/profile', payload)
    setResponseSettingsUpdate(res.data.msg)
  }

  const onClickPreference = async () => {
    const res = await axios.put('http://localhost:5000/user/profile', payload)
    setResponsePreference(res.data.msg)
  }


  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [repeatPass, setRepeatPass] = useState("")
  const [responsePass, setRessponsePass] = useState("")

  const payloadPassword = { oldPass, newPass }

  const changePassword = async () => {
    if (newPass === repeatPass) {
      const res = await axios.put("http://localhost:5000/user/password", payloadPassword)
      setRessponsePass(res.data.msg)
      console.log(res.data)
    }
    else {
      setRessponsePass("Powtórz hasło poprawnie!")
    }
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
  <div style={{ color: "red", fontSize: "0.8rem" }}>{responseSettingsUpdate ? responseSettingsUpdate : null}</div>
        <div style={{ color: "red", fontSize: "0.8rem" }}>{responsePass ? responsePass : null}</div>

      </Typography>

      {menu === 'main' ? (
        <form onSubmit={onClick}>
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
              />
            </Grid>
          </Grid>
        </form>
      ) : (
          <form onSubmit={changePassword}>
            <Grid container spacing={2} alignItems="stretch" direction="column">
              <Grid item>
                <TextField
                  value={oldPass}
                  name="oldPass"
                  id="oldPass"
                  onChange={(e) => setOldPass(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Stare hasło"
                />
              </Grid>
              <Grid item>
                <TextField
                  value={newPass}
                  name="newPass"
                  id="newPass"
                  onChange={(e) => setNewPass(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Nowe hasło"
                />
              </Grid>
              <Grid item>
                <TextField
                  value={repeatPass}
                  name="repeatPass"
                  id="repeatPass"
                  onChange={(e) => setRepeatPass(e.target.value)}
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
                  to="/"
                  onClick={() => { dispatch(deleteUser()); dispatch(removeToken()) }}
                >
                  <Typography>Tak</Typography>
                </Link>
                <span> / </span>
                <Link color="primary">
                  <Typography>Anuluj</Typography>
                </Link>
              </Box>
            </>
          ) : (
              <Link

              // onClick={() => alert('delete account popup')}
              >
                <Typography>Usuń konto</Typography>
              </Link>
            )}
        </Box>
        <Divider />
      </Box>
      {menu === 'pass' ?
        <Button
          className={classes.button}
          onClick={changePassword}
          variant="contained"
          color="primary"
          size="large"
        >
          Zapisz zmiany
      </Button>
        :
        <Button
          className={classes.button}
          onClick={onClick}
          variant="contained"
          color="primary"
          size="large"
        >
          Zapisz zmiany
      </Button>}
    </Paper>
  )

  const preferenceSettings = (
    <>
      {
        locationPreference ?
          <>
            <Paper className={classes.paper}>
              <Typography variant="h4" gutterBottom className={classes.title}>
                <SearchIcon />
        Preferencje
        <div style={{ color: "red", fontSize: "0.8rem" }}>{responsePreference ? responsePreference : null}</div>
              </Typography>
              <form>
                <Grid container spacing={2} alignItems="stretch" direction="column">
                  <Grid item>
                    <label style={{ fontSize: "1.5rem", marginRight: "15px" }}
                    >Męzczyźni
              <input
                        type="checkbox"
                        checked={genderPreferenceMale}
                        onChange={() => setGenderPreferenceMale(!genderPreferenceMale)}
                        name="genderPreferenceMale" />
                    </label>
                    <label style={{ fontSize: "1.5rem" }}> Kobiety
                < input
                        type="checkbox"
                        checked={genderPreferenceFemale}
                        onChange={() => setGenderPreferenceFemale(!genderPreferenceFemale)}
                        name="genderPreferenceFemale" />
                    </label>
                  </Grid>
                  <Grid item>
                    <Typography>Wiek:</Typography>
                    <Slider
                      value={ageRangePreference}
                      onChange={(event, newValue) => {
                        setAgeRangePreference(newValue)
                      }}
                      valueLabelDisplay="on"
                      name="ageRangePreference"
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
                        value={locationPreference}
                        onChange={handleLocationPreference}
                        name="locationPreference"
                        displayEmpty
                      >
                        <option value="Poznan">Poznan</option>
                        <option value="Wroclaw">Wroclaw</option>
                        <option value="Krakow">Krakow</option>
                        <option value="Warszawa">Warszawa</option>
                        <option value="Gdansk">Gdansk</option>
                        <option value="Lodz">Lodz</option>
                        <option value="Szczecin">Szczecin</option>

                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>

              <Button
                className={classes.button}
                onClick={onClickPreference}
                variant="contained"
                color="primary"
                size="large"
              >
                Zapisz zmiany
      </Button>
            </Paper >
          </>
          : null

      }
    </>
  )

  const feedback = (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.title}>
        Feedback
      </Typography>

      <form>
        <TextField
          value={""}
          name="feedback"
          id="feedback"
          onChange={(event) => setName(event.target.value)}
          variant="outlined"
          fullWidth
          label="Zgłoś błąd lub zadaj pytanie..."
          multiline
          rows={4}
        />
      </form>

      <Button
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Wyślij
      </Button>
    </Paper>
  )

  const blocked = (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.title}>
        Odblokuj
      </Typography>

      <Box
        className={classes.clickableRow}
        onClick={() => alert('Odblokowano!')}
      >
        <Link
        // onClick={() => alert('send change password email')}
        >
          <Typography>Aga, Wrocław, 21</Typography>
        </Link>
      </Box>
      <Divider />
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

  return useMediaQuery(theme.breakpoints.up('md')) ?
    (
      <Grid container>

        <Grid item xs={12} md={6}>
          {accountSettings}
          {preferenceSettings}
          {feedback}
          {blocked}
        </Grid>
        {/* <Grid item xs={12} md={6}>
              {questionSettings}
            </Grid> */}

      </Grid>
    ) : (
      <Box>

        {accountSettings}
        {preferenceSettings}
        {feedback}
        {blocked}
        {/* {questionSettings} */}

      </Box>
    )
}

export default SettingsPage
