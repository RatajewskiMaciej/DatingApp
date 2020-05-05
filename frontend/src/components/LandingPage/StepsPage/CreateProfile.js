import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Slider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// DUMMY USER DATA
import userData from '../../../data/userData'
const profileImage = userData.images.filter((image) => image.profile)[0].src
// ***

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
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
  slider: {},
}))

const CreateProfile = () => {
  const classes = useStyles()

  // States
  const [ageRangePreference, setAgeRangePreference] = useState(
    userData.preferences.ageRange
  )
  const [age, setAge] = useState(userData.age)
  const [gender, setGender] = useState(null)
  const [preferenceMale, setPreferenceMale] = useState(false)
  const [preferenceFemale, setPreferenceFemale] = useState(false)
  const [photoAdd, setPhotoAdd] = useState(false)
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
  const handlePreferenceMale = () => {
    setPreferenceMale(!preferenceMale)
  }
  const handlePreferenceFemale = () => {
    setPreferenceFemale(!preferenceFemale)
  }
  const handlePhotoAdd = () => {
    setPhotoAdd(true)
  }
  // ***

  return (
    <Box className={classes.paper}>
      <Box className={classes.imageBox}>
        <Avatar
          alt="Profile picture"
          src={photoAdd ? profileImage : null}
          className={classes.avatar}
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
              alert('Add photo popup')
              handlePhotoAdd()
            }}
            variant={photoAdd ? 'outlined' : 'contained'}
            size="large"
            color="primary"
            fullWidth
          >
            {photoAdd? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h5">Jestem</Typography>
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
          <Typography variant="h5">W wieku</Typography>
          <Slider
            className={classes.slider}
            value={age}
            onChange={handleAge}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={18}
            max={70}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">Chcę poznać</Typography>
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button
              onClick={() => handlePreferenceFemale()}
              color={preferenceFemale ? 'secondary' : null}
              variant={preferenceFemale ? 'contained' : null}
            >
              Kobiety
            </Button>
            <Button
              onClick={() => handlePreferenceMale()}
              color={preferenceMale ? 'primary' : null}
              variant={preferenceMale ? 'contained' : null}
            >
              Mężczyzn
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography variant="h5">W wieku</Typography>
          <Slider
            className={classes.slider}
            value={ageRangePreference}
            onChange={handleAgeRangeSlider}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={18}
            max={70}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateProfile
