import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import _ from 'lodash'

import { validate } from '../validate'
import {languages} from '../../../constants'
import client from '../../../client'
import { receiveLogin } from '../../LoginPage/actions/index'

import { InputField } from '../../../components/InputField'
import { ERROR_MESSAGES } from '../../../errorCodes'

class LanguageSelect extends Component {
    render() {
        const languagesOptions = Object
            .keys(languages)
            .map(key =>  <option value={key} key={key}> {languages[key]} </option>)
        return (
            <select value={this.props.val} className="form-control" onChange={this.props.onChange}>
                {languagesOptions}
            </select>
        );
    }
}

class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values) {
        return client({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                path: '/api/account',
                entity: {
                    ...values
                }
            }
        ).then(() => {
                return client({
                    method: 'GET',
                    path: '/api/account'
                })
            }
        ).then((response) => {
                this.props.dispatch(receiveLogin(response.entity))
            }
        ).catch((response)=> {
                console.error(response)
                let code = response.headers['X-Timesheetapp-Error']
                if (typeof code === 'undefined') {
                    throw new SubmissionError({_error: ERROR_MESSAGES['ERROR_INTERNAL_SERVER_ERROR']})
                }
                throw new SubmissionError({_error: ERROR_MESSAGES[code]})
            }
        )
    }


    render() {
        const { error, submitSucceeded, initialValues, handleSubmit, submitting, invalid} = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2 >User settings for [<b>{initialValues.firstName}</b>]</h2>

                            {submitSucceeded && <div className="alert alert-success">
                                <strong>Settings saved!</strong>
                            </div>}
                            {error && <div className="alert alert-danger">
                                <strong> {error} </strong>
                            </div>}
                            <div className="form-group">
                                <label className="control-label" htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" component={InputField} label="First Name"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" component={InputField} label="Last Name"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="email">E-mail</label>
                                <Field name="email" type="text" component={InputField} label="E-mail"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="langKey">Language</label>
                                <Field name="langKey"
                                       component={(field) => (
                                                    <LanguageSelect value={field.input.value} onChange={ e => field.input.onChange(e.target.value)}/>)}/>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch: dispatch
})

SettingsForm = reduxForm({
    form: 'settingForm',
    validate
})(SettingsForm)

SettingsForm = connect(
    mapStateToProps
)(SettingsForm)
export default SettingsForm