import React from 'react';
import Logged from './Navbar/Logged';
import Logout from './Navbar/Logout';
import { useSelector } from "react-redux";


const Navbar = () => {
  const isLogged = useSelector(state => state.log.isLogged)
  console.log(isLogged)
  return (
    <div>
      {isLogged ? <Logged /> : <Logout />}
    </div>
  )
}

export default Navbar
