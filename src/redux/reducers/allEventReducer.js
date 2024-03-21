const initialState = {
    events: [],
};

const allEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_EVENTS':
            return {
                ...state,
                events: action.payload
            };
        default:
            return state;
    }
};

export default allEventReducer;
