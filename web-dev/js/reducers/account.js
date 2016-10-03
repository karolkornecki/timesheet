const account = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'REQUEST_LOGIN':
            // TODO rest api invokation
            return state;
        case 'LOGIN_SUCCESS':
            let account = action.account
            return {
                ...account,
                isAuthenticated: action.isAuthenticated,
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


export default account