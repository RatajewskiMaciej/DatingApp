import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Questions from './Questions'
import CreateProfile from './CreateProfile'

import { Paper, MobileStepper, Button, Box, Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles((theme) => ({
  stepsPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing(3),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}))

const StepsPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box className={classes.stepsPage}>
      <Container maxWidth="sm">
        <Paper>
          <Box className={classes.content}>
            {activeStep === 0 ? <CreateProfile /> : null}
            {activeStep === 1 ? <Questions ids={[1, 4]} /> : null}
            {activeStep === 2 ? <Questions ids={[5, 8]} /> : null}
            {activeStep === 3 ? <Questions ids={[9, 12]} /> : null}
          </Box>

          <MobileStepper
            variant="progress"
            steps={4}
            activeStep={activeStep}
            position="static"
            nextButton={
              activeStep === 3 ? (
                <Link className={classes.link} to="/">
                  <Button
                    size="large"
                    onClick={() => alert('zapisz formularz')}
                  >
                    Zapisz
                    {theme.direction === 'rtl?' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                </Link>
              ) : (
                <Button size="large" onClick={() => handleNext()}>
                  Dalej
                  {theme.direction === 'rtl?' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              )
            }
            backButton={
              <Button
                size="large"
                disabled={activeStep === 0 ? true : false}
                onClick={handleBack}
              >
                {theme.direction === 'rtl?' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Cofnij
              </Button>
            }
          />
        </Paper>
      </Container>
    </Box>
  )
}

export default StepsPage
