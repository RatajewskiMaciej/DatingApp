import { GET_USERS, GET_USERDATA, GET_PROFILE } from '../types';


const initialState = {
  users: [],
  user: [],
  profile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return {
        ...state,
        user: action.user
      };
    case GET_USERS:
      return {
        ...state,
        users: action.users
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};