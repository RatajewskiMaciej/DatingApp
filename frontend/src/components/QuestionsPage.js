import React, { useState } from 'react'
import {
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MobileStepper,
  Button,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import questionData from '../data/questionData'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: '800px',
  },
  questionContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  formLabel: {
    marginBottom: '10px',
  },
}))

const QuestionsPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = useState('female')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <Paper>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Odpowiedz na pytania:
          </Typography>
        </Grid>
        {questionData.map((question) => (
          <Grid item key={question.id}>
            <Paper className={classes.questionContainer}>
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
            </Paper>
          </Grid>
        ))}
        <Grid item>
          <MobileStepper
            variant="progress"
            steps={6}
            activeStep={1}
            position="static"
            nextButton={
              <Button size="large" onClick={() => console.log('click')}>
                Dalej
                {theme.direction === 'rtl?' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="large" onClick={() => console.log('click')}>
                {theme.direction === 'rtl?' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Cofnij
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default QuestionsPage
