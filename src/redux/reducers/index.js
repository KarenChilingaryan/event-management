import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventReducer from './eventReducer';
import allEventReducer from './allEventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
  allEvents: allEventReducer,
});

export default rootReducer;
