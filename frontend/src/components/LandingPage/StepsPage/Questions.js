import React, { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../../redux/actions/usersAction'
import axios from "axios"

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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [getUser])

  const user = useSelector((state) => state.users.user)

  const classes = useStyles()
  const [value, setValue] = useState('female')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const [payload, setPayload] = useState({})

  const onSubmit = async () => {
    const res = await axios.post("http://localhost:5000/user/questions", payload)
  }

  const onChange = e => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h5" color="primary">Jestem tu, żeby...</Typography>
      <div><input type="radio" name="res1" value='rozmawiać' onChange={onChange} />rozmawiać</div>
      <div><input type="radio" name="res1" value='znaleźć przyjaciół' onChange={onChange} />znaleźć przyjaciół</div>
      <div><input type="radio" name="res1" value='randkować' onChange={onChange} />randkować</div>

      <Typography variant="h5" color="primary">Co myślisz o używkach, takich jak alkohol i papierosy?</Typography>
      <div><input type="radio" name="res2" value='Piję i palę do woli - żyjemy po to, żeby się wyszaleć' onChange={onChange} />Piję i palę do woli - żyjemy po to, żeby się wyszaleć</div>
      <div><input type="radio" name="res2" value='Wszystko jest dla ludzi, byle z umiarem' onChange={onChange} /> Wszystko jest dla ludzi, byle z umiarem</div>
      <div><input type="radio" name="res2" value='Obrzydza mnie to, jak ludzie się nimi trują' onChange={onChange} />Obrzydza mnie to, jak ludzie się nimi trują</div>

      <Typography variant="h5" color="primary"> Czy uważasz się za osobę uduchowioną?</Typography>
      <div><input type="radio" name="res3" value='Zdecydowanie tak' onChange={onChange} />Zdecydowanie tak</div>
      <div><input type="radio" name="res3" value='Raczej tak' onChange={onChange} />Raczej tak</div>
      <div><input type="radio" name="res3" value='Nie' onChange={onChange} />Nie</div>

      <Typography variant="h5" color="primary">Czy jesteś mądrzejszy od większości ludzi?</Typography>
      <div><input type="radio" name="res4" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res4" value='Nie' onChange={onChange} />Nie</div>

      <Typography variant="h5" color="primary">Co myślisz o dzieciach?</Typography>
      <div><input type="radio" name="res5" value='Dzieci to skarb!' onChange={onChange} />Dzieci to skarb!</div>
      <div><input type="radio" name="res5" value='Są odrażające' onChange={onChange} />Są odrażające</div>
      <div><input type="radio" name="res5" value='Są mi obojętne' onChange={onChange} />Są mi obojętne</div>

      <Typography variant="h5" color="primary">Jak ważne są dla Ciebie poglądy polityczne?</Typography>
      <div><input type="radio" name="res6" value='Bardzo ważne' onChange={onChange} /> Bardzo ważne</div>
      <div><input type="radio" name="res6" value='Trochę ważne' onChange={onChange} />Trochę ważne</div>
      <div><input type="radio" name="res6" value='Nieważne' onChange={onChange} />Nieważne</div>

      <Typography variant="h5" color="primary">Czy lubisz aktywność fizyczną?</Typography>
      <div><input type="radio" name="res7" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res7" value='Nie' onChange={onChange} />Nie</div>

      <Typography variant="h5" color="primary">Masz samochód?</Typography>
      <div><input type="radio" name="res8" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res8" value='Nie' onChange={onChange} />Nie</div>

      <Typography variant="h5" color="primary">Czy zaliczasz się do grona wegan lub wegetarian?</Typography>
      <div><input type="radio" name="res9" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res9" value='Nie' onChange={onChange} />Nie</div>

      <Typography variant="h5" color="primary">Wolisz psy czy koty?</Typography>
      <div><input type="radio" name="res10" value='Psy' onChange={onChange} />Psy</div>
      <div><input type="radio" name="res10" value='Koty' onChange={onChange} />Koty</div>
      <div><input type="radio" name="res10" value='Lubię i psy i koty' onChange={onChange} />Lubię i psy i koty</div>
      <div><input type="radio" name="res10" value='Ani jedno, ani drugie' onChange={onChange} />Ani jedno, ani drugie</div>

      <Typography variant="h5" color="primary">Czy Twoje życie Cię zadowala?</Typography>
      <div><input type="radio" name="res11" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res11" value='Nie' onChange={onChange} />Nie</div>
      <div><input type="radio" name="res11" value='Ciężko powiedzieć' onChange={onChange} />Ciężko powiedzieć</div>

      <Typography variant="h5" color="primary">Czy sztuka jest dla Ciebie ważna?</Typography>
      <div><input type="radio" name="res12" value='Tak' onChange={onChange} />Tak</div>
      <div><input type="radio" name="res12" value='Nie' onChange={onChange} />Nie</div>

      <Button
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
      >
        Zapisz zmiany
      </Button>
    </form>
  )
}

export default Questions
