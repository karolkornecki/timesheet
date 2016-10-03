import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import _ from 'lodash'

import { validate } from '../validate'
import {languages} from '../../../constants'

import { InputField } from '../../../components/InputField'

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
        this.state = {valid: false}
    }

    submit() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        return sleep(1000)
            .then(() => {
                this.setState({valid: true})
            })
    }


    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.submit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2 >User settings for [<b>{this.props.initialValues.firstName}</b>]</h2>

                            {this.state.valid && <div className="alert alert-success">
                                <strong>Settings saved!</strong>
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
                            <button type="submit" className="btn btn-primary">Save</button>
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

SettingsForm = reduxForm({
    form: 'settingForm',
    validate
})(SettingsForm)

SettingsForm = connect(
    mapStateToProps
)(SettingsForm)
export default SettingsForm