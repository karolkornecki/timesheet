const authData = (state = {}, action = {}) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            // TODO rest api invokation
            return state;
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                username: '',
                password: '',
                isAuthenticated: action.isAuthenticated,
                isAuthenticationFailed: false,
                token: action.user.token
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                username: '',
                password: '',
                isAuthenticated: action.isAuthenticated,
                isAuthenticationFailed: true,
                token: '',
                message: action.message
            }
        default :
            return state;
    }
}

export default authData