const initialState = {
    events: [],
};


const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter((event) => event.eventId !== action.payload),
            };
        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map((event) =>
                    event.eventId === action.payload.eventId ? action.payload : event
                ),
            };
        case 'GET_EVENTS':
            return {
                ...state,
                events: action.payload,
            };
        default:
            return state;
    }
};

export default eventReducer;
