import React from 'react';
import Tologout from './Navbar/toLogOut';
import Tologin from './Navbar/toLogIn';
import { useSelector } from "react-redux";


const Navbar = () => {

  const tokenLogin = useSelector(state => state.log.tokenLogin)

  return (
    <div>
      {tokenLogin ? <Tologout /> : <Tologin />}
    </div>
  )
}

export default Navbar
