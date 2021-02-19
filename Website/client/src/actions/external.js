import axios from 'axios';
import { setAlert } from './alert';

import { SET_ALL_PROFILES } from './types';

// Get current users profile
export const setAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/');

    dispatch({
      type: SET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // Will respond with an object that gives the 1. Response text 2. Status code
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
