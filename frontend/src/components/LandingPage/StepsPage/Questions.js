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
      {questionData
        .filter((q) => q.id <= props.ids[1] && q.id >= props.ids[0])
        .map((question, index) => (
          <Grid item key={index}>
            <Box className={classes.question}>
              <FormControl component="fieldset">
                <FormLabel className={classes.formLabel}>
                  <Typography variant="h5" color="primary">
                    {questionData[question.id - 1].question}
                  </Typography>
                </FormLabel>

                <RadioGroup
                  aria-label={question.question}
                  name={question.id}
                  value={value}
                  onChange={handleChange}
                >
                  {Object.values(questionData[question.id - 1].answers).map(
                    (answer) => (
                      <FormControlLabel
                        key={`${question}.${answer}`}
                        value={`${question}.${answer}`}
                        control={<Radio />}
                        label={answer}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        ))}
    </form>
  )
}

export default Questions
