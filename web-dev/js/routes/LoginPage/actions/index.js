export const receiveLogin = (account) => ({
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    account
})

export const loginError = (message) => ({
    type: 'LOGIN_FAILURE',
    isAuthenticated: false,
})