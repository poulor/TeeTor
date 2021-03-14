import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// This function gets passed to a specific use case. In this case, it is register.js. That use case passes in specific values
// relevent to the function. In this case, msg and alertType for the view. Timeout = 4000 sets a default timeout
export const setAlert = (msg, alertType, timeout = 40000) => (dispatch) => {
  //Generate a random id for the alert
  const id = uuidv4();
  // Triggers the reducer because its "DISPATCHING" something of type set_alert, reducer js file will know what to do with it
  dispatch({
    //Dispatch the alert with the passed in msg and type
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Trigers the 'remove_alert' in the reducer causing it to get removed from the state after 4 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
