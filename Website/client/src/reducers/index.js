import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import profileType from "./profile_type.js";
import external from './external';

export default combineReducers({
  //Add all reducers we make in here
  alert,
  auth,
  profile,
  profileType,
  external
});
