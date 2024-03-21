import axiosInstance from "../../utils/axiosInstance";

export const getEvents = () => ({
  type: 'GET_ALL_EVENTS',
});

export const fetchEvents = (params = {}) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('getEvents', { params });
      const events = response.data.events;
      dispatch({ type: 'GET_ALL_EVENTS', payload: events });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
};