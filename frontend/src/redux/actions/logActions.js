import { REMOVE_TOKEN, GET_TOKEN, GET_USER } from '../types';
import axios from "axios";

export const getToken = () => dispatch => {
  dispatch({
    type: GET_TOKEN, tokenLogin: localStorage.getItem('usertoken')
  });
};

export const removeToken = () => dispatch => {
  dispatch({
    type: REMOVE_TOKEN, tokenLogin: localStorage.removeItem('usertoken')
  });
};

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/user");

    dispatch({
      type: GET_USER,
      userID: res.data._id
    });
  } catch (error) {
    console.log(error.message);
  }
};

