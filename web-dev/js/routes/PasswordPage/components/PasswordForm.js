import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'

import { validate } from '../validate'
import * as constants from '../../../errorCodes.js'
import { InputField } from '../../../components/InputField'
import client from '../../../client'

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {valid: false}
    }

    submit(values) {
        return new Promise(resolve => resolve()).then(() => {
            if (!_.isEqual(values.password, values.confirmation)) {
                this.setState({valid: false})
                throw new SubmissionError({_error: constants.PASSWORD_DOES_NOT_MATCH})
            }
            return client({
                    method: 'POST',
                    path: '/api/account/change_password',
                    entity: values.password
                }
            ).then(
                () => {
                    this.setState({valid: true})
                    this.props.reset()
                }
            ).catch(error => {
                    console.log(error)
                    this.setState({valid: false})
                    throw new SubmissionError({_error: constants.SERVER_ERROR})
                }
            )
        })
    }


    render() {
        const { error, handleSubmit, invalid, submitting } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Password for [<b>{this.props.initialValues.firstName}</b>]</h2>

                            {this.state.valid && <div className="alert alert-success">
                                <strong>Password changed!</strong>
                            </div>}

                            {error && error === constants.SERVER_ERROR && <div className="alert alert-danger">
                                <strong>An error has occurred!</strong> The password could not be changed.
                            </div>}

                            {error && error === constants.PASSWORD_DOES_NOT_MATCH &&
                            <div className="alert alert-danger">
                                The password and its confirmation do not match!
                            </div>}


                            <div className="form-group">
                                <label className="control-label" htmlFor="password">New password</label>
                                <Field name="password" type="password" component={InputField}/>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="confirmation">New password
                                    confirmation</label>
                                <Field name="confirmation" type="password" component={InputField}/>
                            </div>
                            <button type="submit" disabled={invalid || submitting} className="btn btn-primary">Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    initialValues: state.account
})

PasswordForm = reduxForm({
    form: 'passwordForm',
    validate

})(PasswordForm)

PasswordForm = connect(
    mapStateToProps
)(PasswordForm)
export default PasswordForm
