import React,{ Component } from 'react';
import {ModalManager, Modal, Effect} from 'react-dynamic-modal';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import client from '../../../client'
import * as actions from '../actions/index'

import { InputField } from '../../../components/InputField'


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {authenticationFailed: false}
        this.submit = this.submit.bind(this);

    }

    submit(values) {
        return client({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            path: '/api/authentication',
            entity: {
                j_username: values.username,
                j_password: values.password,
                'remember-me': values.rememberme
            }
        }).then(() => {
            return client({
                method: 'GET',
                path: '/api/account'
            })
        }).then(response => {
            console.log('Authentication success')
            this.props.dispatch(actions.receiveLogin(response.entity))
            browserHistory.push('/')
        }).catch(error => {
            console.log('Authentication failed' + error)
            this.setState({authenticationFailed: true})
        });
    }


    render() {
        return (
            <Modal style={{content: {marginTop: '5%'}}}
                   effect={Effect.SlideFromRight}
                   onRequestClose={()=> browserHistory.push('/') }>
                <form onSubmit={this.props.handleSubmit(this.submit)}>
                    <div className="modal-header">
                        <Link to='/' className="close">&times;</Link>
                        <h4 className="modal-title">Sign in</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <h1 >Sign in</h1>
                            </div>
                            {this.state.authenticationFailed && <div className="col-md-8 col-md-offset-2">
                                <div className="alert alert-danger">
                                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                                </div>
                            </div>}
                            <div className="col-md-8 col-md-offset-2">
                                <div className="form-group">
                                    <label htmlFor="username">Login</label>
                                    <Field name="username" type="text" component={InputField} label="Your username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" component={InputField}
                                           label="Your password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rememberme">
                                        <Field name="rememberme" type="checkbox" component="input"/>
                                        <span >Remember me</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Sign in</button>
                                <p></p>

                                <div className="alert alert-warning">
                                    <a className="alert-link" href="#">Did you forget your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch: dispatch
})

LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

LoginForm = connect(
    mapDispatchToProps
)(LoginForm)

export default LoginForm