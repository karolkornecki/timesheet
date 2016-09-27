import React, { Component } from 'react'

class PasswordBox extends Component {
    constructor(props) {
        super(props)
        this.state = {password: ''}
    }


    render() {
        return (
            <div className="form-group">
                <label className="control-label" htmlFor="password">New password</label>
                <input ref="password" value={this.state.password} type="password" className="form-control" id="password" name="password"/>

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
        );
    }
}

export default PasswordBox