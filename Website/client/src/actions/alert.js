import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// This function gets passed to a specific use case. In this case, it is register.js. That use case passes in specific values
// relevant to the function. In this case, msg, alertType and position for the view.
// position = 'top-right' sets a default position of top right
// timeout = 4000 sets a default timeout of 4 seconds
export const setAlert = (msg, alertType, position = 'top-right', timeout = 4000) => (dispatch) => {
  //Generate a random id for the alert
  const id = uuidv4();
  // Triggers the reducer because its "DISPATCHING" something of type set_alert, reducer js file will know what to do with it
  dispatch({
    //Dispatch the alert with the passed in msg and type
    type: SET_ALERT,
    // payload: { msg, alertType, id },
    payload: { msg, alertType, position, timeout, id },
  });

  // Triggers the 'remove_alert' in the reducer causing it to get removed from the state after 4 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const removeAlert = (alertID) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: alertID });
};
