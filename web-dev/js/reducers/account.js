const account = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'LOGOUT':
            return {
                isAuthenticated: action.isAuthenticated
            }
        case 'LOGIN_SUCCESS':
            let account = action.account
            return {
                ...account,
                isAuthenticated: action.isAuthenticated
            }
        default :
            return state;
    }
}


export default account