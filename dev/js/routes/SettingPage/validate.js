import * as msg from '../../messages'

export const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = msg.FIRSTNAME_REQUIRED
    } else if (values.firstName.length < 1) {
        errors.firstName = msg.FIRSTNAME_MINLENGTH
    } else if (values.firstName.length > 50) {
        errors.firstName = msg.FIRSTNAME_MAXLENGTH
    }

    if (!values.lastName) {
        errors.lastName = msg.LASTNAME_REQUIRED
    } else if (values.lastName.length < 1) {
        errors.lastName = msg.LASTNAME_MINLENGTH
    } else if (values.lastName.length > 50) {
        errors.lastName = msg.LASTNAME_MAXLENGTH
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

    return errors
}