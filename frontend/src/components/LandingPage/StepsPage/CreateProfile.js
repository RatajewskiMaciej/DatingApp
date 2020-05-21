import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, addPhoto } from '../../../redux/actions/usersAction'
import axios from "axios"

import {
  Avatar,
  Box,
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Slider,
  Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// DUMMY USER DATA
import userData from '../../../data/userData'
const profileImage = userData.images.filter((image) => image.profile)[0].src
// ***

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.9,
    },
  },
  imageBox: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formBox: {
    padding: 10,
  },
  button: {
    height: theme.spacing(7),
  },
  buttonGroup: {
    height: theme.spacing(6),
  },
  slider: {
    width: '100%',
    paddingTop: 45,
  },
}))

const CreateProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [getUser])
  // States
  const [ageRangePreference, setAgeRangePreference] = useState(
    userData.preferences.ageRange
  )
  const [age, setAge] = useState(userData.age)
  const [gender, setGender] = useState(null)
  const [genderPreferenceMale, setGenderPreferenceMale] = useState(false)
  const [genderPreferenceFemale, setGenderPreferenceFemale] = useState(false)
  const [locationPreference, setLocationPreference] = useState(null)

  const [photoAdd, setPhotoAdd] = useState(false)
  const payload = {
    age,
    locationPreference,
    genderPreferenceFemale,
    genderPreferenceMale,
    ageRangePreference,
  }

  const onClick = async () => {
    const res = await axios.put('http://localhost:5000/user/profile', payload)
  }

  const inputRef = useRef()
  const user = useSelector(state => state.users.user)

  // Handlers
  const handleAgeRangeSlider = (event, newAgeRange) => {
    setAgeRangePreference(newAgeRange)
  }
  const handleAge = (event, newAge) => {
    setAge(newAge)
  }
  const handleGender = (newGender) => {
    setGender(newGender)
  }
  const handleLocation = (newLocation) => {
    setLocationPreference(locationPreference)
  }
  const handlePreferenceMale = () => {
    setGenderPreferenceMale(!genderPreferenceMale)
  }
  const handlePreferenceFemale = () => {
    setGenderPreferenceFemale(!genderPreferenceFemale)
  }
  const handlePhotoAdd = () => {
    setPhotoAdd(true)
  }

  return (
    <Box>
      <Box className={classes.imageBox}>
        <Avatar
          alt="Profile picture"
          src={user.avatar ? `http://localhost:5000/${user.avatar}` : null}
          className={classes.avatar}
          onClick={() => {
            alert('Add photo popup')
            handlePhotoAdd()
          }}
        />
      </Box>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.formBox}
      >
        <Grid item>
          <Button
            className={classes.button}
            onClick={() => {
              inputRef.current.click()
            }}
            variant={photoAdd ? 'outlined' : 'contained'}
            size="large"
            color="primary"
            fullWidth
          >
            <input
              type="file"
              name="avatar"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const image = e.target.files[0]
                let formData = new FormData()
                formData.append('avatar', image, image.name)
                dispatch(addPhoto(formData))
                window.location.reload()
              }}
            />
            {photoAdd ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center">
            Jestem
          </Typography>
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button
              onClick={() => handleGender('male')}
              color={gender === 'male' ? 'primary' : null}
              variant={gender === 'male' ? 'contained' : null}
            >
              Mężczyzną
            </Button>
            <Button
              onClick={() => handleGender('female')}
              color={gender === 'female' ? 'secondary' : null}
              variant={gender === 'female' ? 'contained' : null}
            >
              Kobietą
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center">
            Jestem z miejscowości
          </Typography>
          <Select
            native
            value={null}
            onChange={handleLocation}
            name="locationPreference"
            displayEmpty
            variant="outlined"
            fullWidth
          >
            <option value="Poznan">Poznan</option>
            <option value="Wroclaw">Wroclaw</option>
            <option value="Krakow">Krakow</option>
            <option value="Warszawa">Warszawa</option>
            <option value="Gdansk">Gdansk</option>
            <option value="Lodz">Lodz</option>
            <option value="Szczecin">Szczecin</option>
          </Select>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center">
            Mam lat
          </Typography>
          <Slider
            className={classes.slider}
            value={age}
            name="age"
            onChange={handleAge}
            valueLabelDisplay="on"
            aria-labelledby="range-slider"
            min={18}
            max={70}
          />
        </Grid>

        <Grid item>
          <Typography variant="h6" align="center">
            Chcę poznać
          </Typography>
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button
              onClick={() => handlePreferenceFemale()}
              color={genderPreferenceFemale ? 'secondary' : null}
              variant={genderPreferenceFemale ? 'contained' : null}
              name="genderPreferenceFemale"
            >
              Kobiety
            </Button>
            <Button
              onClick={() => handlePreferenceMale()}
              color={genderPreferenceMale ? 'primary' : null}
              variant={genderPreferenceMale ? 'contained' : null}
              name="genderPreferenceMale"
            >
              Mężczyzn
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center">
            W wieku
          </Typography>
          <Slider
            className={classes.slider}
            value={ageRangePreference}
            onChange={handleAgeRangeSlider}
            valueLabelDisplay="on"
            name="ageRangePreference"
            aria-labelledby="range-slider"
            min={18}
            max={70}
          />
        </Grid>
      </Grid>
      <Button
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Zapisz zmiany
      </Button>
    </Box>
  )
}

export default CreateProfile
