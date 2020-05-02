import React from 'react'
import SignUp from './LandingPage/SignUp'
import ProfilePage from './LandingPage/ProfilePage'
import { useSelector } from 'react-redux'

const LandingPage = () => {
  const tokenLogin = useSelector(state => state.log.tokenLogin)
  console.log(tokenLogin)
  return (
    <>
      {tokenLogin ? <ProfilePage /> : <SignUp style={{height: '200px'}}/>
      }
    </>
  )
}

export default LandingPage
