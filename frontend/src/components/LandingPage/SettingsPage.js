import React, { useState } from 'react'
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Slider,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  TextField,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import userData from '../../data/userData'

import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

import axios from "axios"
import { useSelector } from "react-redux"

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
    width: '50%'
  },
  clickableTableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#eee',
    },
  },
}))

const SettingsPage = () => {
  const classes = useStyles()

  const user = useSelector(state => state.users.user)

  // User profile data
  const city = userData.city
  const [name, setName] = useState(user.first_name)
  const [age, setAge] = useState(user.age)
  const [email, setEmail] = useState(user.email)

  // User preferences
  const [locationPreference, setLocationPreference] = useState(
    user.locationPreference ? user.locationPreference : userData.preferences.location
  )
  const [genderPreferenceMale, setGenderPreferenceMale] = useState(
    user.gender.genderPreferenceMale ? user.gender.genderPreferenceMale : false
  )
  const [genderPreferenceFemale, setGenderPreferenceFemale] = useState(
    user.gender.genderPreferenceFemale ? user.gender.genderPreferenceFemale : false
  )
  const [ageRangePreference, setAgeRangePreference] = useState(
    user.ageRange ? user.ageRange : userData.preferences.ageRange
  )

  console.log(ageRangePreference)

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


  const payload = { name, age, email, locationPreference, genderPreferenceFemale, genderPreferenceMale, ageRangePreference }
  const onClick = async () => {
    await axios.put("http://localhost:5000/user/profile", payload);
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            <SettingsIcon />
            Ustawienia konta
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Imię:</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={name}
                      name="name"
                      id="username"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Wiek:</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={age}
                      name="age"
                      id="userage"
                      onChange={(event) => setAge(event.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Adres email:</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={email}
                      name="email"
                      id="useremail"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Hasło</Typography>
                  </TableCell>

                  <TableCell>
                    <Link
                      href="#"
                    // onClick={() => alert('send change password email')}
                    >
                      <Typography>Zmień hasło</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Konto</Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="#"
                    // onClick={() => alert('delete account popup')}
                    >
                      <Typography>Usuń konto</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            <SearchIcon />
            Preferencje
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Chcę poznać:</Typography>
                  </TableCell>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={genderPreferenceFemale}
                            onChange={handleGenderPreferenceFemale}
                            style={{ padding: '0' }}
                          />
                        }
                        label="Kobiety"
                        style={{ marginRight: '20px' }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={genderPreferenceMale}
                            onChange={handleGenderPreferenceMale}
                            style={{ padding: '0' }}
                          />
                        }
                        label="Mężczyzn"
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>W wieku:</Typography>
                  </TableCell>
                  <TableCell>
                    <Slider
                      value={ageRangePreference}
                      onChange={handleAgeRangeSlider}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      style={{ padding: 0, width: '70%' }}
                      min={18}
                      max={70}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.clickableTableRow}>
                  <TableCell>
                    <Typography>Z miejsca:</Typography>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={locationPreference}
                      onChange={handleLocationPreference}
                      displayEmpty
                      className={classes.select}
                      style={{ minWidth: '200px' }}
                    >
                      <MenuItem value={city}>{city}</MenuItem>
                      <MenuItem value="Kraj">Kraj</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

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
      </Grid>
    </Grid>
  )
}

export default SettingsPage
