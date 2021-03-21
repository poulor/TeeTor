import { ALL_PROFILES_ERROR, SET_ALL_PROFILES } from '../actions/types';

// Default initial status
const initialState = {
    allProfiles: [],
    isDirty: true,
    error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_PROFILES:
      return {
        ...state,
        allProfiles: payload,
        isDirty: false
      };
    case ALL_PROFILES_ERROR:
        return{
            ...state,
            error: payload
        }
        
    default:
      return state;
  }
}
