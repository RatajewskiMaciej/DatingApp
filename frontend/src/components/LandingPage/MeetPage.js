import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ProfileGallery from './_Parts/ProfileGallery'

//DUMMY USER DATA
import userData from '../../data/userData'
//***

import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import Index from './StepsPage/index'

import { getUsers, getUser } from "../../redux/actions/usersAction"

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getUser())
  }, [getUsers, getUser])
  const classes = useStyles()

  const user = useSelector(state => state.users.user)
  const users = useSelector(state => state.users.users)

  const getMatchClass = () => {
    if (users.match >= 80) return classes.matchScoreHigh
    if (users.match >= 50 && userData.match < 80)
      return classes.matchScoreMid
    if (users.match < 50) return classes.matchScoreLow
  }



  return (
    <Paper className={classes.paper}>
      {user.age ?

        <ProfileGallery
          tileBar
          title={`${users.first_name}, ${users.age}`}
          // subtitle={
          // <span
          //   className={getMatchClass()}
          // >{`Dopasowanie ${users.match}%`}</span>
          // }
          mapSource={users}
          tileClick={(event) => alert('go to profile')}
          iconClick={(event) => {
            event.stopPropagation()
            alert('like profile')
          }}
        />
        : <Index />}
    </Paper>
  )
}

export default MeetPage
