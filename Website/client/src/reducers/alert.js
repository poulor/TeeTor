import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//This reducer gets specific functions dispatched to it from 'actions' folder. Actions doesn't know how to deal with the requests
// Reducer takes the content passed in by the 'actions' js file and does what needs to be done. In this case updating the state

//Just pertains to allerts
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // State is immutable so we have to include any other state that is already there
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
