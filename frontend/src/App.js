import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'

import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'

import Navigation from './components/Navigation'
import ProfilePage from './components/ProfilePage'
import ChatPage from './components/ChatPage'
import SettingsPage from './components/SettingsPage'
import MeetPage from './components/MeetPage'
import QuestionsPage from './components/QuestionsPage'

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="sm">
          <Navbar />
          <LandingPage />

          <Navigation />
          <ProfilePage />

          <Navigation />
          <SettingsPage />

          <Navigation />
          <MeetPage />

          <Navigation />
          <QuestionsPage />

          <Navigation />
          <ChatPage />
        </Container>
      </div>
    </Provider>
  )
}

export default App
