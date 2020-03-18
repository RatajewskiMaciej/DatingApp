import { IS_LOGGED, SET_ALERT } from '../types';

export const getLogs = (data) => dispatch => {
  dispatch({
    type: IS_LOGGED, isLogged: !data
  })
};