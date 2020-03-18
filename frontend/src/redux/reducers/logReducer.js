import { LOG_IN, LOG_OUT } from '../types';


const initialState = {
  tokenLogin: localStorage.getItem("usertoken")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        tokenLogin: localStorage.getItem("usertoken")
      };
    case LOG_OUT:
      return {
        ...state,
        tokenLogin: localStorage.removeItem("usertoken")
      };
    default:
      return state;
  }
}