import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from './redux/store'
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <LandingPage />
      </div>
    </Provider>
  );
}

export default App;
