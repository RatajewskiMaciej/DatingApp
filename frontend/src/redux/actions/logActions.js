import { LOG_OUT, LOG_IN } from '../types';

export const toLogIn = () => dispatch => {
  dispatch({
    type: LOG_IN, tokenLogin: localStorage.getItem('usertoken')
  })
};

export const toLogOut = () => dispatch => {
  dispatch({
    type: LOG_OUT, tokenLogin: localStorage.removeItem('usertoken')
  })
};