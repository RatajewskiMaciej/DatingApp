import React from 'react'
import SignUp from './LandingPage/SignUp'
import FirstPage from './LandingPage/FirstPage'
import { useSelector } from 'react-redux'

const LandingPage = () => {
  const tokenLogin = useSelector(state => state.log.tokenLogin)
  console.log(tokenLogin)
  return (
    <>
      {tokenLogin ? <FirstPage /> : <SignUp />
      }
    </>
  )
}

export default LandingPage
