import React from 'react'

import { Paper, Modal, Container, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: theme.spacing(1),
  },
}))

const Popup = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Modal open={props.open} className={classes.modal}>
      {useMediaQuery(theme.breakpoints.down('xs')) ? (
        <Paper className={classes.modalContent}>{props.content}</Paper>
      ) : (
        <Container maxWidth="md">
          <Paper className={classes.modalContent}>{props.content}</Paper>
        </Container>
      )}
    </Modal>
  )
}

export default Popup
