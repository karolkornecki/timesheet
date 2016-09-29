import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input  {...input}
            placeholder={label}
            type={type}
            className="form-control"/>

        <div>
            <p className="help-block">
                {touched && error && <span>{error}</span>}
            </p>
        </div>
    </div>
)

class PasswordForm extends Component {
    render() {
        return (
            <form>
                <div>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Password for [<b></b>]</h2>

                            <div className="alert alert-success">
                                <strong>Password changed!</strong>
                            </div>
                            <div className="alert alert-danger">
                                <strong>An error has occurred!</strong> The password could not be changed.
                            </div>

                            <div className="alert alert-danger">
                                The password and its confirmation do not match!
                            </div>


                            <div className="form-group">
                                <label className="control-label" htmlFor="password">New password</label>
                                <input type="password" className="form-control"/>
                                <div>
                                    <p className="help-block">
                                        Your password is required.
                                    </p>

                                    <p className="help-block">
                                        Your password is required to be at least 5 characters.
                                    </p>

                                    <p className="help-block">
                                        Your password cannot be longer than 50 characters.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="confirmPassword">New password
                                    confirmation</label>
                                <input type="password" className="form-control"/>

                                <div>
                                    <p className="help-block">
                                        Your confirmation password is required.
                                    </p>

                                    <p className="help-block">
                                        Your confirmation password is required to be at least 5 characters.
                                    </p>

                                    <p className="help-block">
                                        Your confirmation password cannot be longer than 50 characters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default PasswordForm