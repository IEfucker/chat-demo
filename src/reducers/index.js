import { combineReducers } from 'redux';
import userInfo from './userInfo';
// import friends from './friends';
import rooms from './rooms';
import chatLog from './chatLog';

const rootReducer = combineReducers({
  userInfo,
  // friends,
  rooms,
  chatLog
});

export default rootReducer;
