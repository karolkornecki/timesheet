import * as msg from '../../messages'

export const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = msg.USERNAME_REQUIRED
    } else if (values.username.length < 1) {
        errors.username = msg.USERNAME_MINLENGTH
    } else if (values.username.length > 50) {
        errors.username = msg.USERNAME_MAXLENGTH
    } else if (!/^[a-z0-9]+$/.test(values.username)) {
        errors.username = msg.USERNAME_INVALID
    }

    if (!values.email) {
        errors.email = msg.EMAIL_REQUIRED
    } else if (values.email.length < 5) {
        errors.email = msg.EMAIL_MINLENGTH
    } else if (values.email.length > 100) {
        errors.email = msg.EMAIL_MAXLENGTH
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = msg.EMAIL_INVALID
    }

    if (!values.password) {
        errors.password = msg.PASSWORD_REQUIRED
    } else if (values.password.length < 4) {
        errors.password = msg.PASSWORD_MINLENGTH
    } else if (values.password.length > 50) {
        errors.password = msg.PASSWORD_MAXLENGTH
    }

    if (!values.confirmation) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_REQUIRED
    } else if (values.confirmation.length < 4) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_MINLENGTH
    } else if (values.confirmation.length > 50) {
        errors.confirmation = msg.CONFIRMATION_PASSWORD_MAXLENGTH
    }
    return errors
}