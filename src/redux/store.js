import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import eventReducer from './reducers/eventReducer';
import allEventReducer from './reducers/allEventReducer';

const store = configureStore({
  reducer: rootReducer,
  events: eventReducer,
  allEvents: allEventReducer,
});

export default store;
