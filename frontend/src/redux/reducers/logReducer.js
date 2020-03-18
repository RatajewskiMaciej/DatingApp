import { IS_LOGGED, SET_ALERT } from '../types';


const initialState = {
  isLogged: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return {
        ...state,
        isLogged: !state.isLogged
      };
    default:
      return state;
  }
}