import { LOADING, SEARCH_USER } from '../action/index';

const INITIAL_STATE = {
  loading: false,
  list: [],
}

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SEARCH_USER:
      return { ...state, list: action.list };
    default:
      return state;
  }
}