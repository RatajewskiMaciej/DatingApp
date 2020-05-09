import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'

import CssBaseline from '@material-ui/core/CssBaseline'
import { Box } from '@material-ui/core'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Navigation from './components/Navbar/Navigation'
import SettingsPage from './components/LandingPage/SettingsPage'
import ChatPage from './components/LandingPage/ChatPage'
import MeetPage from './components/LandingPage/MeetPage'
import ProfilePage from './components/LandingPage/ProfilePage'
import StepsPage from './components/LandingPage/StepsPage'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <CssBaseline />
        <Box className="App">
          <Navigation />
          <Box className="reactBody">
            <Switch>
              <Route path="/" exact component={ProfilePage} />
              <Route path="/start" component={StepsPage} />
              <Route path="/profil" component={ProfilePage} />
              <Route path="/odkrywaj" component={MeetPage} />
              <Route path="/czat" component={ChatPage} />
              <Route path="/ustawienia" component={SettingsPage} />
            </Switch>
          </Box>
        </Box>
      </Provider>
    </Router>
  )
}

export default App
