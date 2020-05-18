import axios from 'axios';
import { GET_USERS, GET_USERDATA, GET_PROFILE } from '../types';


export const getUser = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/user");

    dispatch({
      type: GET_USERDATA,
      user: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/user/users");

    dispatch({
      type: GET_USERS,
      users: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const getProfile = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/user/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      profile: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

