import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import saveRegistrationUsername from '../actions/index'

class UsernameBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            isMaxLength: false,
            isRequired: false,
            isLowerOrDigit: true
        }
    }

    handleChange(e) {
        this.setState({
            username: e.target.value,
            isMaxLength: e.target.value.trim().length > 50,
            isLowerOrDigit: /^[a-z0-9]+$/.test(e.target.value),
        })
        this.props.dispatch(saveRegistrationUsername(e.target.value))
    }

    render() {
        let isTooLongClass = classnames({
            'help-block': true,
            'show': this.state.isMaxLength,
            'hide': !this.state.isMaxLength
        })
        let isLowerOrDigitClass = classnames({
            'help-block': true,
            'show': !this.state.isLowerOrDigit,
            'hide': this.state.isLowerOrDigit
        })
        let isRequired = classnames({
            'help-block': true,
            'show': this.props.isRequired,
            'hide': !this.props.isRequired
        })
        return (

            <div className="form-group">
                <label className="control-label" htmlFor="login">Username</label>
                <input ref="username" value={this.state.username}
                       type="text" className="form-control" id="login" name="login"
                       onChange={ (e)=> this.handleChange(e)}/>

                <div>
                    <p className={isRequired}>
                        Your username is required.
                    </p>

                    <p className={isTooLongClass}>
                        Your username cannot be longer than 50 characters.
                    </p>

                    <p className={isLowerOrDigitClass}>
                        Your username can only contain lower-case letters and digits.
                    </p>
                </div>
            </div>
        );
    }
}

UsernameBox = connect()(UsernameBox);

export default UsernameBox