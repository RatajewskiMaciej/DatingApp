import { combineReducers } from 'redux';
import logReducer from './logReducer';
import usersReducer from "./usersReducer";

export default combineReducers({
  log: logReducer,
  users: usersReducer,
});