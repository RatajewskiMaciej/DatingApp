import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'

import CssBaseline from '@material-ui/core/CssBaseline'
import { Box } from '@material-ui/core'

import Navigation from './components/Navbar/Navigation'
// import LandingPage from './components/LandingPage'
// import Navbar from './components/Navbar'

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Box className="App">
        {/* <Navbar/> */}
        {/* <LandingPage/> */}
        <Navigation/>
      </Box>
    </Provider>
  )
}

export default App
