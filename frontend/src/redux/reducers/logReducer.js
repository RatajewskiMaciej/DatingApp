import { GET_TOKEN, REMOVE_TOKEN, GET_USER } from '../types';


const initialState = {
  tokenLogin: localStorage.getItem("usertoken"),
  loginResponse: "",
  userID: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        tokenLogin: localStorage.getItem("usertoken")
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        tokenLogin: localStorage.removeItem("usertoken")
      };
    case GET_USER:
      return {
        ...state,
        userID: action.userID
      };
    default:
      return state;
  }
};