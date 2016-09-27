import React, { Component } from 'react';

import UsernameBox from './UsernameBox'
import EmailBox from './EmailBox'
import PasswordBox from './PasswordBox'
import PasswordConfirmationBox from './PasswordConfirmationBox'

class RegistrationForm extends Component {

    handleSubmit(e) {
        e.preventDefault();

    }

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
                        <form name="form" role="form" onSubmit={ (e) => this.handleSubmit(e)}>
                            <UsernameBox />
                            <EmailBox />
                            <PasswordBox />
                            <PasswordConfirmationBox />
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