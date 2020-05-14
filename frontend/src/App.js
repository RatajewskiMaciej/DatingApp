import React from 'react'
import './App.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { Box } from '@material-ui/core'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Navigation from './components/Navbar/Navigation'
import SettingsPage from './components/LandingPage/SettingsPage'
import ChatPage from './components/LandingPage/ChatPage'
import MeetPage from './components/LandingPage/MeetPage'
import ProfilePage from './components/LandingPage/ProfilePage'
import StepsPage from './components/LandingPage/StepsPage'
import ToLogIn from './components/Navbar/toLogIn'
import SignUp from './components/LandingPage/SignUp'

function App() {
  const login = useSelector((state) => state.log.tokenLogin)
  return (
    <Router>
      <CssBaseline />
      {login ? (
        <>
          <Box className="App">
            <Navigation />
            <Box className="reactBody">
              <Switch>
                <Route path="/start" component={StepsPage} />
                <Route path="/" exact component={MeetPage} />
                <Route path="/profil" component={ProfilePage} />
                <Route path="/czat" component={ChatPage} />
                <Route path="/ustawienia" component={SettingsPage} />
              </Switch>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Route path="/" exact component={ToLogIn} />
          <Route path="/register" exact component={SignUp} />
        </>
      )}
    </Router>
  )
}

export default App
