import React, { Component } from 'react'

class PasswordConfirmationBox extends Component {
    constructor(props) {
        super(props)
        this.state = {confirmation: ''}
    }

    render() {
        return (
            <div className="form-group">
                <label className="control-label" htmlFor="confirmPassword">New password confirmation</label>
                <input ref="confirmation" value={this.state.confirmation} type="password" className="form-control" id="confirmPassword"
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
        );
    }
}

export default PasswordConfirmationBox