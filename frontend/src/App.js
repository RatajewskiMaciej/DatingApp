import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from './redux/store'
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <SignUp />
      </div>
    </Provider>
  );
}

export default App;
