import { GET_USERS, GET_USERDATA, GET_PROFILE, DELETE_USER, UPDATE_USERDATA, ADD_PHOTO, USER_CHAT, GET_CHAT, ADD_MESSAGE, DATA_UPLOAD } from '../types';


const initialState = {
  users: [],
  user: [],
  profile: {},
  response: "",
  userChat: {},
  chat: {},
  dataUpload: {}
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
    case DELETE_USER:
      return {
        ...state,
        user: []
      };
    case ADD_PHOTO:
      return {
        ...state,
        user: action.user
      };
    case USER_CHAT:
      return {
        ...state,
        userChat: action.user
      };
    case GET_CHAT:
      return {
        ...state,
        chat: action.chat
      };
    case DATA_UPLOAD:
      return {
        ...state,
        dataUpload: action.data
      };
    case ADD_MESSAGE:
      return {
        ...state,
        chat: {
          sendersID: state.chat.sendersID,
          messages: state.chat.messages.push(action.message)
        }
      };
    default:
      return state;
  }
};