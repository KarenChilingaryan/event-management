const initialState = {
    userData: null,
    isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                userData: action.payload,
                isLoggedIn: true,
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                userData: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default userReducer;
