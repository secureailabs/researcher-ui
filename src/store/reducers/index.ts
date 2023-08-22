// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './Auth';
import userprofile from './userprofile';
import scn_details from './scn_details';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  auth,
  userprofile,
  scn_details
});

export default reducers;
