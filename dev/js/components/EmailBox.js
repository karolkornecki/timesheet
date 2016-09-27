import React, { Component } from 'react'

class EmailBox extends Component {
    constructor(props) {
        super(props)
        this.state = {email: ''}
    }


    render() {
        return (
            <div className="form-group">
                <label className="control-label" htmlFor="email">E-mail</label>
                <input ref="email" value={this.state.email} type="email" className="form-control" id="email" name="email"/>

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
        );
    }
}

export default EmailBox