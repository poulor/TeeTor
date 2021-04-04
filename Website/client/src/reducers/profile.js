import { GET_PROFILE, GET_PROFILES, GET_OTHER_PROFILE, CLEAR_OTHER_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../actions/types';

// Default initial status
const initialState = {
  profile: null,
  visitingProfile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case GET_OTHER_PROFILE:
      return {
        ...state,
        visitingProfile: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_OTHER_PROFILE:
      return {
        ...state,
        visitingProfile: null,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
