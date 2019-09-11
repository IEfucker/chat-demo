import { combineReducers } from 'redux';
import friends from './friends';
import rooms from './rooms';
import chatLog from './chatLog';

const rootReducer = combineReducers({
  friends,
  rooms,
  chatLog
});

export default rootReducer;
