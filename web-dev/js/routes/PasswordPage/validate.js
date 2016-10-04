import * as msg from '../../messages'

export const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.password = msg.PASSWORD_REQUIRED
    } else if (values.password.length < 1) { // TODO min length = 5 on server
        errors.password = msg.PASSWORD_MINLENGTH
    } else if (values.password.length > 50) {
        errors.password = msg.PASSWORD_MAXLENGTH
    }

    if (!values.confirmation) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_REQUIRED
    } else if (values.confirmation.length < 1) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_MINLENGTH
    } else if (values.confirmation.length > 50) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_MAXLENGTH
    }

    return errors
}