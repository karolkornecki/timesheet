import * as msg from '../../messages'

export const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = msg.USERNAME_REQUIRED
    }
    if (!values.password) {
        errors.password = msg.PASSWORD_REQUIRED
    }
    return errors
}