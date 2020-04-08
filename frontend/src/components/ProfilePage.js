import React, { useState } from 'react'

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
  GridList,
  GridListTile,
  TextField,
  ClickAwayListener,
  Modal,
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'

import userData from '../data/userData'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
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
    position: 'relative',
  },
  modalContent: {
    position: 'absolute',
    width: '80%',
    height: '90%',
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(1),
  },
  modalCancelIcon: {
    position: 'relative',
  },
  clickableImage: {
    '&:hover': {
      opacity: 0.9,
      cursor: 'pointer',
    },
  },
  cancelButton: {
    float: 'right',
    color: '#222',
  },
}))

const ProfilePage = () => {
  // User profile data
  const name = userData.username
  const age = userData.age
  const city = userData.city
  const userImages = userData.images
  const [profileImage, setProfileImage] = useState(
    userData.images.filter((image) => image.profile)[0].src
  )
  const [about, setAbout] = useState(userData.about)
  // Modal sections toggles (modal edit popups)
  const [editAbout, setEditAbout] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  // Image popup states (image gallery on clicking an image)
  const [imagePopup, setImagePopup] = useState(false)
  const [imageSource, setImageSource] = useState('')
  const [imageNumber, setImageNumber] = useState(0)

  const toggleEditAbout = () => {
    setEditAbout(!editAbout)
  }
  const toggleEditImage = () => {
    setEditPhoto(!editPhoto)
  }
  const toggleImagePopup = (source, number) => {
    setImagePopup(!imagePopup)
    setImageSource(source)
    setImageNumber(number)
  }

  const classes = useStyles()

  const editPhotoModal = (
    <Modal open={editPhoto} className={classes.modal}>
      <Paper className={classes.modalContent}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <IconButton
              className={classes.cancelButton}
              onClick={() => toggleEditImage()}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center" paragraph>
              Wybierz zdjęcie profilowe
            </Typography>
            <GridList className={classes.gridList}>
              {userImages.map((image) => (
                <GridListTile key={image.id}>
                  <img
                    src={image.src}
                    alt="user gallery item"
                    onClick={(event) => {
                      setProfileImage(userImages[image.id - 1].src)
                      toggleEditImage()
                    }}
                    className={classes.clickableImage}
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                toggleEditImage()
                alert('upload image window')
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              Lub dodaj zdjęcie
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )

  const headerSection = (
    <Grid container>
      <IconButton onClick={(event) => toggleEditImage()}>
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
          <IconButton style={{ margin: '10px 10px 0 0' }}>
            <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        ) : (
          <IconButton
            style={{ margin: '10px 10px 0 0' }}
            color="primary"
            onClick={(event) => {
              toggleEditAbout()
            }}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <br />
      {editAbout ? (
        <ClickAwayListener onClickAway={(event) => toggleEditAbout()}>
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

  const imagePopupModal = (
    <Modal
      open={imagePopup}
      style={{ backgroundColor: 'black' }}
      className={classes.modal}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.modalContent}
      >
        <Grid item>
          <IconButton
            style={{ float: 'right' }}
            onClick={() => toggleImagePopup(null)}
          >
            <CancelIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Grid>
        <Grid
          item
          style={{
            backgroundImage: `url(${imageSource})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '80%',
          }}
        ></Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setProfileImage(imageSource)
              setImagePopup()
            }}
          >
            <PersonIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
          <IconButton
            onClick={() => {
              if (imageNumber > 1) {
                setImageNumber(imageNumber - 1)
                setImageSource(userImages[imageNumber].src)
              }
            }}
          >
            <NavigateBeforeIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
          <Typography
            variant="body2"
            style={{ color: 'white', display: 'inline-block' }}
          >
            {`${imageNumber} z ${userImages.length}`}
          </Typography>
          <IconButton
            onClick={() => {
              if (imageNumber < userImages.length) {
                setImageNumber(imageNumber + 1)
                setImageSource(userImages[imageNumber].src)
              }
            }}
          >
            <NavigateNextIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
          <IconButton
            onClick={() => {
              alert('delete forever')
              setImagePopup()
            }}
          >
            <DeleteForeverIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Modal>
  )

  const photoSection = (
    <GridList className={classes.gridList} cellHeight={200} cols={3}>
      <Button
        onClick={(event) => alert('upload image window')}
        style={{ backgroundColor: '#222' }}
      >
        <GridListTile>
          <AddCircleIcon className={classes.addIcon} />
        </GridListTile>
      </Button>

      {userImages.map((image) => (
        <GridListTile key={image.id}>
          <img
            src={image.src}
            className={classes.clickableImage}
            alt="user gallery item"
            onClick={(event) => {
              toggleImagePopup(event.target.src, image.id)
              setImageNumber(image.id)
              setImageSource(event.target.src)
            }}
          />
        </GridListTile>
      ))}
    </GridList>
  )

  return (
    <>
      <Paper className={classes.root}>
        {headerSection}
        <Divider />
        {aboutSection}
        {photoSection}
      </Paper>
      {imagePopupModal}
      {editPhotoModal}
    </>
  )
}

export default ProfilePage
