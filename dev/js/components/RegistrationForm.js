import React, { Component } from 'react';

class RegistrationForm extends Component {
    render() {
        return (
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
                        <form name="form" role="form">

                            <div className="form-group">
                                <label className="control-label" htmlFor="login">Username</label>
                                <input type="text" className="form-control" id="login" name="login"/>

                                <div>
                                    <p className="help-block">
                                        Your username is required.
                                    </p>

                                    <p className="help-block">
                                        Your username is required to be at least 1 character.
                                    </p>

                                    <p className="help-block">
                                        Your username cannot be longer than 50 characters.
                                    </p>

                                    <p className="help-block">
                                        Your username can only contain lower-case letters and digits.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="email">E-mail</label>
                                <input type="email" className="form-control" id="email" name="email"/>

                                <div >
                                    <p className="help-block">
                                        Your e-mail is required.
                                    </p>

                                    <p className="help-block">
                                        Your e-mail is invalid.
                                    </p>

                                    <p className="help-block">
                                        Your e-mail is required to be at least 5 characters.
                                    </p>

                                    <p className="help-block">
                                        Your e-mail cannot be longer than 100 characters.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="password">New password</label>
                                <input type="password" className="form-control" id="password" name="password"/>

                                <div>
                                    <p className="help-block">
                                        Your password is required.
                                    </p>

                                    <p className="help-block">
                                        Your password is required to be at least 4 characters.
                                    </p>

                                    <p className="help-block">
                                        Your password cannot be longer than 50 characters.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="confirmPassword">New password
                                    confirmation</label>
                                <input type="password" className="form-control" id="confirmPassword"
                                       name="confirmPassword"/>

                                <div>
                                    <p className="help-block">
                                        Your confirmation password is required.
                                    </p>

                                    <p className="help-block">
                                        Your confirmation password is required to be at least 4 characters.
                                    </p>

                                    <p className="help-block">
                                        Your confirmation password cannot be longer than 50 characters.
                                    </p>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                        <p></p>

                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrationForm