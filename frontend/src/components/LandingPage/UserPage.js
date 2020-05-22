import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ImageGridUser from './_Parts/ImageGridUser'
import Popup from './_Parts/Popup'

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
} from '@material-ui/core'

import { CircularProgress } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getProfile } from '../../redux/actions/usersAction'

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
    },
    overflow: 'hidden',
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      width: '35vw',
      height: '35vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  },
  headerSection: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
  headerTextUp: {
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('xs')]: {
      fontSize: '9vw',
    },
  },
  headerTextDown: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '5vw',
    },
  },
  aboutSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  aboutHeader: {
    padding: '20px 20px 0px 20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '8vw',
    },
  },
  aboutField: {
    margin: theme.spacing(1),
  },
  addIcon: {
    color: 'white',
    fontSize: theme.spacing(5),
    opacity: '0.5',
    textAlign: 'center',
  },
  gallery: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryContent: {
    padding: theme.spacing(1),
  },
  galleryUi: {
    color: theme.palette.background.paper,
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
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    dispatch(getProfile())
  }, [getProfile])

  const profile = useSelector(state => state.users.profile)

  // User profile data
  const avatars = profile.avatars ? profile.avatars : []
  const [name, setName] = useState(null)
  const [age, setAge] = useState(null)
  const [city, setCity] = useState(null)
  const [description, setDescription] = useState(null)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    setName(profile.first_name)
    setAge(profile.age)
    setCity(profile.city)
    setDescription(profile.description)
    setAvatar(profile.avatar)
  }, [profile])

  const deleteAvatar = (source) => {
    console.log('Delete image ' + source)
  }

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
  const [activeStep, setActiveStep] = useState(null)
  const maxSteps = avatars ? avatars.length : 1
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const headerSection = (
    <Box className={classes.headerSection}>

      <Avatar
        alt="Profile picture"
        src={`http://localhost:5000/${avatar}`}
        className={classes.avatar}
      />


      <Box className={classes.header}>
        <Typography className={classes.headerTextUp} variant="h3">
          {name}
        </Typography>
        <Typography className={classes.headerTextDown} variant="h5">{`${
          city ? city : ''
          } ${age ? age : ''}`}</Typography>
      </Box>
    </Box>
  )

  const aboutSection = (
    <Box>
      <Box className={classes.aboutSection} style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" className={classes.aboutHeader}>
          O mnie
        </Typography>
        <Box>
          <div
            name="about"
            variant="outlined"
            fullWidth
            multiline
            id="firstName"
            autoFocus
            value={"description"}
            placeholder="Napisz coś o sobie..."
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem itaque esse, maxime sit pariatur magni obcaecati earum vero accusantium eligendi temporibus atque facilis explicabo, aspernatur incidunt distinctio similique eaque! Minus.
          </div>
        </Box>
      </Box>

    </Box>
  )

  const photoSection = (
    <ImageGridUser
      mapSource={avatars}
      addTile
      alt="Zdjęcie"
      tileClick={(event) => {
        setActiveStep(Number(event.target.getAttribute('index')))
        setGallery(true)
        dispatch(getProfile())
      }}
      colNumMd={2}
      colNumLg={2}
    />
  )

  const editPhotoModal = (
    <Popup
      paper
      open={editPhoto}
      content={
        <>
          <ImageGridUser
            colNumLg={4}
            mapSource={avatars}
            alt={'Image Gallery'}
            tileClick={(event) => {
              setAvatar(profile.avatars[event.target.getAttribute('index')])
              toggleEditImage()
            }}
          />



        </>
      }
    />
  )

  const galleryModal = (
    <Modal
      open={gallery}
      style={{ backgroundColor: 'black' }}
      className={classes.gallery}
    >
      <Box className={classes.galleryContent}>
        <Box>
          <IconButton
            onClick={() => {
              setGallery(false)
            }}
          >
          </IconButton>

          <IconButton
            style={{ float: 'right' }}
            onClick={(event) => {
              setGallery(false)
            }}
          >
            <CancelIcon fontSize="large" className={classes.galleryUi} />
          </IconButton>
        </Box>
        <img
          className={classes.img}
          src={`http://localhost:5000/${avatars[activeStep]}`}
          alt={`zdjęcie`}
        />
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={() => {
                handleNext()
              }}
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
              onClick={() => {
                handleBack()
              }}
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
              {profile.avatars ? (
                <Paper style={{ padding: 10, margin: 10 }}>{photoSection}</Paper>
              ) : (
                  <CircularProgress />
                )}
            </Grid>
          </Grid>
        )}

      {galleryModal}
    </Box>
  )
}

export default ProfilePage
