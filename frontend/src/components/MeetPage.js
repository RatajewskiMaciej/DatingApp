import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import userData from '../data/userData'

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    '&:hover': {
      color: 'pink',
    },
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

const MeetPage = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <GridList
        className={classes.gridList}
        cellHeight={200}
        cols={3}
      >
        {userData.images.map((image) => (
          <GridListTile
            key={image.id}
            onClick={(event) => alert(`go to profile id ${image.id}`)}
          >
            <img
              src={image.src}
              className={classes.gridListTile}
              alt="user profile"
            />
            <GridListTileBar
              title={userData.username}
              className={classes.titleBar}
              subtitle={
                <span>
                  {userData.city}, {userData.age}
                </span>
              }
              actionIcon={
                <IconButton
                  aria-label="info about"
                  className={classes.icon}
                  onClick={() => alert(`like profile ${image.id}`)}
                >
                  <FavoriteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  )
}

export default MeetPage
