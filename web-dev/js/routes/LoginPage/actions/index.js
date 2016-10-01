export const requestLogin = (username, password) => ({
    type: 'REQUEST_LOGIN',
    isAuthenticated: false,
    username,
    password
})

export const receiveLogin = (user) => ({
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    user
})

export const loginError = (message) => ({
    type: 'LOGIN_FAILURE',
    isAuthenticated: false,
    message
})