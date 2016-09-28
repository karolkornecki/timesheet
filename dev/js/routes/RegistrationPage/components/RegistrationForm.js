import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values) => {
    return sleep(1000) // simulate server latency
        .then(() => {
            if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
                throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
            } else if (values.password !== 'redux-form') {
                throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
            } else {
                alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            }
        })
}


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Your username is required.'
    } else if (values.username.length < 1) {
        errors.username = 'Your username is required to be at least 1 characters.'
    } else if (values.username.length > 50) {
        errors.username = 'Your username cannot be longer than 50 characters.'
    } else if (!/^[a-z0-9]+$/.test(values.username)) {
        errors.username = 'Your username can only contain lower-case letters and digits.'
    }

    if (!values.email) {
        errors.email = 'Your e-mail is required.'
    } else if (values.email.length < 5) {
        errors.email = 'Your e-mail is required to be at least 5 characters..'
    } else if (values.email.length > 100) {
        errors.email = 'Your e-mail cannot be longer than 100 characters.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Your e-mail is invalid.'
    }

    if (!values.password) {
        errors.password = 'Your password is required.'
    } else if (values.password.length < 4) {
        errors.password = 'Your password is required to be at least 4 characters.'
    } else if (values.password.length > 50) {
        errors.password = 'Your password cannot be longer than 50 characters.'
    }

    if (!values.confirmation) {
        errors.confirmation = 'Your confirmation password is required.'
    } else if (values.confirmation.length < 4) {
        errors.confirmation = 'Your confirmation password is required to be at least 4 characters.'
    } else if (values.confirmation.length > 50) {
        errors.confirmation = 'Your confirmation password cannot be longer than 50 characters.'
    }

    return errors
}


const renderField = ({ input, label, type, meta: {dirty, touched, error } }) => (
    <div>
        <input  {...input}
            placeholder={label}
            type={type}
            className="form-control"/>

        <div>
            <p className="help-block">
                {dirty && error && <span>{error}</span>}
            </p>
        </div>
    </div>
)


const RegistrationForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1>Registration</h1>

                        <div className="alert alert-success">
                            <strong>Registration saved!</strong> Please check your email for confirmation.
                        </div>
                        <div className="alert alert-danger">
                            <strong>Registration failed!</strong> Please try again later.
                        </div>
                        <div className="alert alert-danger">
                            <strong>Login name already registered!</strong> Please choose another one.
                        </div>
                        <div className="alert alert-danger">
                            <strong>E-mail is already in use!</strong> Please choose another one.
                        </div>
                        <div className="alert alert-danger">
                            The password and its confirmation do not match!
                        </div>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="username">Username</label>
                            <Field name="username" type="text" component={renderField} label="Username"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email</label>
                            <Field name="email" type="email" component={renderField}
                                   label="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password">Password</label>
                            <Field name="password" type="password" component={renderField} label=""/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="confirmation">Password confirmation</label>
                            <Field name="confirmation" type="password" component={renderField} label=""/>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>



                    </div>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'registrationForm',
    validate
})(RegistrationForm)
