import React, { useRef, useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import {
  GridList,
  GridListTile,
  GridListTileBar,
  useMediaQuery,
  Button,
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getUser } from "../../../redux/actions/usersAction"


import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  gridListTile: {
    borderRadius: theme.spacing(1),
    '&:hover': {
      opacity: 0.9,
      cursor: 'pointer',
    },
  },
  favIcon: {
    color: 'rgba(255, 255, 255, 0.54)',
    '&:hover': {
      color: 'pink',
    },
  },
  addIcon: {
    color: 'white',
    fontSize: theme.spacing(5),
    opacity: '0.5',
    textAlign: 'center',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    cursor: 'pointer'
  },
}))

const ProfileGallery = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [])
  let user = useSelector(state => state.users.user)
  const classes = useStyles()
  const theme = useTheme()

  const [fit, setFit] = useState(0)
  const inputRef = useRef();

  const fitUser = (res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12) => {
    if (user.res1 == res1) setFit(fit++)
    if (user.res2 == res2) setFit(fit++)
    if (user.res3 == res3) setFit(fit++)
    if (user.res4 == res4) setFit(fit++)
    if (user.res5 == res5) setFit(fit++)
    if (user.res6 == res6) setFit(fit++)
    if (user.res7 == res7) setFit(fit++)
    if (user.res8 == res8) setFit(fit++)
    if (user.res9 == res9) setFit(fit++)
    if (user.res10 == res10) setFit(fit++)
    if (user.res11 == res11) setFit(fit++)
    if (user.res12 == res12) setFit(fit++)
  }


  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const getImageCols = () => {
    if (xs) return props.colNumXs ? props.colNumXs : 2
    if (sm) return props.colNumSm ? props.colNumSm : 3
    if (md) return props.colNumMd ? props.colNumMd : 4
    return props.colNumLg ? props.colNumLg : 5
  }

  const getImageHeight = () => {
    if (xs) return 180
    if (sm) return 200
    if (md) return 220
    return 250
  }
  return (
    <GridList cellHeight={getImageHeight()} cols={getImageCols()}>
      {props.addTile ? (
        <Button
          onClick={() => inputRef.current.click()}
          style={{ backgroundColor: '#222' }}
        >
          <input
            type="file"
            name="avatar"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={
              async (e) => {
                const image = e.target.files[0]
                let formData = new FormData();
                formData.append("avatar", image, image.name);
                await axios.put('http://localhost:5000/user/profile', formData)
              }}
          />
          <GridListTile>
            <AddCircleIcon className={classes.addIcon} />
          </GridListTile>
        </Button>

      ) : null}

      {props.mapSource.filter(image => image._id !== user._id).map((image) => (

        <GridListTile key={Math.random()} onClick={() => props.tileClick(image._id)}>
          <img
            src={image.avatar ? `http://localhost:5000/${image.avatar}` : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png"}
            className={classes.gridListTile}
            alt={image}
            onLoad={fitUser(image.res1, image.res2, image.res3, image.res4, image.res5, image.res6, image.res7, image.res8, image.res9, image.res10, image.res11, image.res12)}
          />

          {props.tileBar ? (
            <GridListTileBar
              title={`${image.first_name}, ${image.age ? image.age : ""}`}
              subtitle={props.subtitle}
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  className={classes.favIcon}
                  onClick={() => { }}
                >
                  dopasowanie {fit}
                </IconButton>
              }
            />
          ) : null}
        </GridListTile>
      ))}
    </GridList>
  )
}

export default ProfileGallery
