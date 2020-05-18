import axios from 'axios';
import { GET_USERS, GET_USERDATA, GET_PROFILE, UPDATE_USERDATA, DELETE_USER, ADD_PHOTO } from '../types';


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

export const deleteUser = () => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/user/user`);
    dispatch({
      type: DELETE_USER,
      user: []
    })

  } catch (error) {
    console.log(error.message);
  }
}

export const updateDataUser = payload => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/user/profile`, payload);
    dispatch({
      type: UPDATE_USERDATA,
      user: res.data.user,
      response: res.data.msg
    })
  } catch (error) {
    console.log(error.message);

  }
}

export const addPhoto = formData => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:5000/user//profile/uploads`, formData);
    dispatch({
      type: ADD_PHOTO,
      user: res.data,
    })
  } catch (error) {
    console.log(error.message);

  }
}