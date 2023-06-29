// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './Auth';
import userprofile from './userprofile';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  auth,
  userprofile
});

export default reducers;
