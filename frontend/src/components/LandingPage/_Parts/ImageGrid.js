import React from 'react'

import {
  GridList,
  GridListTile,
  GridListTileBar,
  useMediaQuery,
  Button,
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '800px',
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

const ImageGrid = (props) => {
  const classes = useStyles()
  const theme = useTheme()

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
          onClick={(e) => alert('upload image window')} //do dodania
          style={{ backgroundColor: '#222' }}
        >
          <GridListTile>
            <AddCircleIcon className={classes.addIcon} />
          </GridListTile>
        </Button>
      ) : null}

      {props.mapSource.map((image) => (
        <GridListTile key={image.id} onClick={props.tileClick}>
          <img
            src={image.src}
            className={classes.gridListTile}
            alt={`${props.alt} ${image.id}`}
          />

          {props.tileBar ? (
            <GridListTileBar
              title={props.title}
              subtitle={props.subtitle}
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  className={classes.favIcon}
                  onClick={props.iconClick}
                >
                  <FavoriteIcon />
                </IconButton>
              }
            />
          ) : null}
        </GridListTile>
      ))}
    </GridList>
  )
}

export default ImageGrid
