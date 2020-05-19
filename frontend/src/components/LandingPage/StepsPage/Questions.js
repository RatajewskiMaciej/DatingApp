import React, { useState } from 'react'
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// DUMMY QUESTION DATA
import questionData from '../../../data/questionData'

const useStyles = makeStyles((theme) => ({
  formLabel: {
    marginBottom: '10px',
  },
  question: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const Questions = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState('female')
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <form>
      {questionData.map(res => {
        return (
          <div key={Math.random()}>
            <Typography variant="h5" color="primary">{res.question}</Typography>
            {res.answers.map(response => { return (<div key={Math.random()}><input type="radio" name={res.id} value={response} />{response}</div>) }
            )}
          </div>
        )
      })}
    </form>
  )
}

export default Questions
