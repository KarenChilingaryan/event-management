export const updateUser = (userData) => ({
    type: 'UPDATE_USER',
    payload: userData,
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
});
