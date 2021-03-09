import axios from 'axios';
import { SET_ALL_PROFILES, ALL_PROFILES_ERROR } from './types';

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/');
    dispatch({
      type: SET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_PROFILES_ERROR,
      // Will respond with an object that gives the 1. Response text 2. Status code
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
