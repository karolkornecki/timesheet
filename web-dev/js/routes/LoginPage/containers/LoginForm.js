import React,{ Component } from 'react';
import { Modal, Effect} from 'react-dynamic-modal';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router'
import { connect } from 'react-redux'
import client from '../../../client'

import { InputField } from '../../../components/InputField'


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values) {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        return sleep(1000)
            .then(() => {
                client({method: 'POST', path: '/api/authentication'}).done(response => {
                    console.log(response)
                });
                console.log('end');
            })
    }


    render() {
        return (
            <Modal style={{content: {marginTop: '5%'}}} effect={Effect.SlideFromRight}>
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
                            <div className="col-md-8 col-md-offset-2">
                                <div className="alert alert-danger">
                                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                                </div>
                            </div>
                            <div className="col-md-8 col-md-offset-2">
                                <div className="form-group">
                                    <label htmlFor="username">Login</label>
                                    <Field name="username" type="text" component={InputField} label=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" component={InputField} label=""/>
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

LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm)


export default LoginForm