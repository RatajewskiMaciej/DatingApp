import React from 'react';
import Tologout from './Navbar/toLogOut';
import Tologin from './Navbar/toLogIn';
import { useSelector } from "react-redux";


const Navbar = () => {
  const isLogged = useSelector(state => state.log.isLogged)
  console.log(isLogged)
  return (
    <div>
      {isLogged ? <Tologout /> : <Tologin />}
    </div>
  )
}

export default Navbar
