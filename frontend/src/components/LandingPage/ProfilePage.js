import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import ImageGrid from './_Parts/ImageGrid'
import userData from '../../data/userData'

import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  Badge,
  TextField,
  ClickAwayListener,
  Modal,
  useMediaQuery,
  MobileStepper,
  Container,
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  addIcon: {
    color: 'white',
    fontSize: theme.spacing(5),
    opacity: '0.5',
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: theme.spacing(1),
  },
  galleryUi: {
    color: theme.palette.background.paper,
  },
  modalUi: {
    color: theme.palette.text.primary,
  },
  clickableImage: {
    '&:hover': {
      opacity: 0.9,
      cursor: 'pointer',
    },
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  modalUploadButton: {
    height: theme.spacing(8),
    marginTop: theme.spacing(1),
  },
}))

const ProfilePage = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const user = useSelector((state) => state.users.user)

  // User profile data
  const name = user.first_name
  const age = user.age
  const city = user.city
  const userImages = userData.images
  const [about, setAbout] = useState(user.description)
  const [profileImage, setProfileImage] = useState(
    userData.images.filter((image) => image.profile)[0].src
  )

  // Modal sections
  const [editAbout, setEditAbout] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const [gallery, setGallery] = useState(false)
  const toggleEditAbout = () => {
    setEditAbout(!editAbout)
  }
  const toggleEditImage = () => {
    setEditPhoto(!editPhoto)
  }

  // Image gallery
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = userImages.length
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const headerSection = (
    <Grid container>
      <IconButton
        onClick={(event) => {
          toggleEditImage()
        }}
      >
        <Badge
          overlap="circle"
          badgeContent="zmień"
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar
            alt="Profile picture"
            src={profileImage}
            className={classes.avatar}
          />
        </Badge>
      </IconButton>

      <Grid item style={{ position: 'relative' }}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(0,-50%)',
            marginLeft: '15px',
          }}
        >
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">{`${city}, ${age}`}</Typography>
        </Box>
      </Grid>
    </Grid>
  )

  const aboutSection = (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" style={{ padding: '20px 20px 10px 30px' }}>
          O mnie
        </Typography>

        {editAbout ? (
          <IconButton
            style={{ margin: '10px 10px 0 0' }}
            onClick={async () => {
              await axios.put('http://localhost:5000/user/profile', {
                description: about,
              })
            }}
          >
            <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        ) : (
          <IconButton
            style={{ margin: '10px 10px 0 0' }}
            color="primary"
            onClick={(event) => {
              toggleEditAbout()
              console.log('niedziala')
            }}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <br />
      {editAbout ? (
        <ClickAwayListener onClickAway={(event) => toggleEditAbout()}>
          <form>
            <TextField
              name="about"
              variant="outlined"
              fullWidth
              multiline
              id="firstName"
              autoFocus
              value={about}
              placeholder="Napisz coś o sobie..."
              onChange={(event) => setAbout(event.target.value)}
              style={{ marginBottom: '15px' }}
            />
          </form>
        </ClickAwayListener>
      ) : (
        <Typography
          onClick={() => toggleEditAbout()}
          variant="body1"
          paragraph
          style={{ margin: '0px 20px 35px 20px' }}
        >
          {about ? about : 'Napisz coś o sobie...'}
        </Typography>
      )}
    </Box>
  )

  const photoSection = (
    <ImageGrid
      mapSource={userImages}
      addTile
      alt="Zdjęcie"
      tileClick={(event) => {
        setActiveStep(Number(event.target.alt.split(' ').pop()) - 1)
        setGallery(true)
      }}
      colNumMd={2}
      colNumLg={2}
    />
  )

  const editPhotoModal = (
    <Modal open={editPhoto} className={classes.modal}>
      <Container maxWidth="md">
        <Paper className={classes.modalContent}>
          <ImageGrid
            colNumLg={4}
            mapSource={userImages}
            alt={'user gallery item'}
            tileClick={(event) => {
              setProfileImage(event.target.src)
              toggleEditImage()
            }}
          />
          <Button
            className={classes.modalUploadButton}
            onClick={() => {
              toggleEditImage()
              alert('upload image window')
            }}
            variant="contained"
            color="primary"
            fullWidth
          >
            Dodaj zdjęcie
          </Button>
        </Paper>
      </Container>
    </Modal>
  )

  const galleryModal = (
    <Modal
      open={gallery}
      style={{ backgroundColor: 'black' }}
      className={classes.modal}
    >
      <Box className={classes.modalContent}>
        <Box>
          <IconButton
            onClick={() => {
              alert('delete forever')
              setGallery()
            }}
          >
            <DeleteForeverIcon fontSize="large" className={classes.galleryUi} />
          </IconButton>
          <Button
            className={classes.galleryUi}
            onClick={() => {
              setProfileImage(userData.images[activeStep].src)
              setGallery(false)
            }}
          >
            Ustaw jako profilowe
          </Button>
          <IconButton
            style={{ float: 'right' }}
            onClick={() => setGallery(false)}
          >
            <CancelIcon fontSize="large" className={classes.galleryUi} />
          </IconButton>
        </Box>
        <img
          className={classes.img}
          src={userImages[activeStep].src}
          alt={`zdjęcie ${userImages[activeStep].id}`}
        />
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Modal>
  )

  return (
    <Box className={classes.root}>
      {useMediaQuery(theme.breakpoints.down('sm')) ? (
        <Paper className={classes.paper}>
          {headerSection}
          <Divider />
          {aboutSection}
          {photoSection}
        </Paper>
      ) : (
        <Grid container>
          <Grid item md={6}>
            <Paper className={classes.paper} style={{ paddingBottom: 5 }}>
              {headerSection}
              <Divider />
              {aboutSection}
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper style={{ padding: 10, margin: 10 }}>{photoSection}</Paper>
          </Grid>
        </Grid>
      )}

      {galleryModal}
      {editPhotoModal}
    </Box>
  )
}

export default ProfilePage
