import React from 'react'
import ImageGrid from './_Parts/ImageGrid'

//DUMMY USER DATA
import userData from '../../data/userData'
//***

import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  matchScoreHigh: {
    color: theme.palette.secondary.light,
  },
  matchScoreMid: {
    color: theme.palette.warning.light,
  },
  matchScoreLow: {
    color: theme.palette.success.light,
  },
}))

const MeetPage = (props) => {
  const classes = useStyles()

  const getMatchClass = () => {
    if (userData.match >= 80) return classes.matchScoreHigh
    if (userData.match >= 50 && userData.match <80) return classes.matchScoreMid
    if (userData.match < 50) return classes.matchScoreLow
  }

  return (
    <Paper className={classes.paper}>
      <ImageGrid
        tileBar
        title={`${userData.username}, ${userData.age}`}
        subtitle={
          <span className={getMatchClass()}>{`Dopasowanie ${userData.match}%`}</span>
        }
        mapSource={userData.images}
        tileClick={(event) => alert('go to profile')}
        iconClick={(event) => {
          event.stopPropagation()
          alert('like profile')
        }}
      />
    </Paper>
  )
}

export default MeetPage
