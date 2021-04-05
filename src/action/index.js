import { searchAPI } from '../services/requestAPI';

export const SEARCH_USER = 'SEARCH_USER';
export const LOADING = 'LOADING';

const actionLoading = () => ({
  type: LOADING,
});

const actionSearch = (list) => ({
  type: SEARCH_USER,
  list,
});

export const searchUserName = (userName) => {
  return async (dispatch) => {
    dispatch(actionLoading());
    try {
      const userList = await searchAPI(userName);
      dispatch(actionSearch(userList.items));
    } catch (error) {
      console.log(error);
    }
  }
}
