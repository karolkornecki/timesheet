import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'
import _ from 'lodash'

import * as constants from '../../../errorCodes'
import { validate } from '../validate'
import { InputField } from '../../../components/InputField'
import client from '../../../client'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values) {
        return new Promise(resolve => resolve()).then(() => {
            if (!_.isEqual(values.password, values.confirmation)) {
                throw new SubmissionError({_error: constants.PASSWORD_DOES_NOT_MATCH})
            }
            return client({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    path: '/api/register',
                    entity: {
                        login: values.username,
                        password: values.password,
                        email: values.email
                    }
                }
            ).catch(response => {
                    if (response.entity === constants.EMAIL_ALREADY_IN_USE) {
                        throw new SubmissionError({_error: constants.EMAIL_ALREADY_IN_USE})
                    } else if (response.entity === constants.LOGIN_ALREADY_IN_USE) {
                        throw new SubmissionError({_error: constants.LOGIN_ALREADY_IN_USE})
                    } else {
                        throw new SubmissionError({_error: constants.SERVER_ERROR})
                    }
                }
            )
        })

    }


    render() {
        const { error, handleSubmit, submitting, submitSucceeded, invalid } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h1>Registration</h1>

                            {submitSucceeded && <div className="alert alert-success">
                                <strong>Registration saved!</strong> Please check your email for confirmation.
                            </div>}
                            {error && error === constants.SERVER_ERROR && <div className="alert alert-danger">
                                <strong>Registration failed!</strong> Please try again later.
                            </div>}
                            {error && error === constants.LOGIN_ALREADY_IN_USE &&
                            <div className="alert alert-danger">
                                <strong>Login name already registered!</strong> Please choose another one.
                            </div>}
                            {error && error === constants.EMAIL_ALREADY_IN_USE && <div className="alert alert-danger">
                                <strong>E-mail is already in use!</strong> Please choose another one.
                            </div>}
                            {error && error === constants.PASSWORD_DOES_NOT_MATCH &&
                            <div className="alert alert-danger">
                                The password and its confirmation do not match!
                            </div>}
                        </div>
                        {!submitSucceeded && <div className="col-md-8 col-md-offset-2">
                            <div className="form-group">
                                <label className="control-label" htmlFor="username">Username</label>
                                <Field name="username" type="text" component={InputField} label="Username"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="email">Email</label>
                                <Field name="email" type="email" component={InputField}
                                       label="Email"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="password">Password</label>
                                <Field name="password" type="password" component={InputField} label=""/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="confirmation">Password confirmation</label>
                                <Field name="confirmation" type="password" component={InputField} label=""/>
                            </div>
                            <button type="submit" disabled={invalid || submitting}  className="btn btn-primary">Register</button>
                        </div>}
                    </div>
                </div>
            </form>
        );
    }
}
export default reduxForm({
    form: 'registrationForm',
    validate
})(RegistrationForm)
