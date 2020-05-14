import React from 'react'

import { Paper, Modal, Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  return (
    <Modal open={props.open} className={classes.modal}>
      <Container maxWidth="md">
        <Paper className={classes.modalContent}>{props.content}</Paper>
      </Container>
    </Modal>
  )
}

export default Popup
