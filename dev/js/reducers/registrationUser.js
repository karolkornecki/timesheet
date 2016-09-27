const registrationUser = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SAVE_REGISTRATION_USERNAME':
            return {
                ...state,
                username: action.username
            }
        default :
            return state;
    }
}
export default registrationUser