import { SET_ALL_PROFILES } from '../actions/types';

// Default initial status
const initialState = {
    allProfiles = []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_PROFILES:
      return {
        ...state,
        allProfiles: payload
      };
    default:
      return state;
  }
}
