export const receiveLogin = (account) => ({
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    account
})

export const logout = () => ({
    type: 'LOGOUT',
    isAuthenticated: false
})