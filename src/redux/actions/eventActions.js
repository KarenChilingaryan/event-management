import axiosInstance from "../../utils/axiosInstance";

// src/redux/actions/eventActions.js
export const addEvent = (eventData) => ({
  type: 'ADD_EVENT',
  payload: eventData,
});

export const deleteEvent = (eventId) => ({
  type: 'DELETE_EVENT',
  payload: eventId,
});

export const updateEvent = (eventData) => ({
  type: 'UPDATE_EVENT',
  payload: eventData,
});

export const getEvents = () => ({
  type: 'GET_EVENTS',
});


export const fetchOwnedEvents = (params = {}) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('getEvents', { params });
      const events = response.data.events;
      dispatch({ type: 'GET_EVENTS', payload: events });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
};

export const createEvent = (data = {}) => {
  return async (dispatch) => {
    try {
      await axiosInstance.post('createEvent', data);
      dispatch({ type: 'ADD_EVENT', payload: data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
};

export const editEvent = (data = {}) => {
  return async (dispatch) => {
    try {
      await axiosInstance.put('updateEvent', data);
      dispatch({ type: 'UPDATE_EVENT', payload: data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
};

export const removeEvent = (eventId) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`deleteEvent?eventId=${eventId}`);
      dispatch({ type: 'DELETE_EVENT', payload: eventId });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
};