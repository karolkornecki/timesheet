import React,{ Component } from 'react';
import { Modal, ModalManager, Effect} from 'react-dynamic-modal';
//import { Field, reduxForm } from 'redux-form';

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal style={{content: {margin: 'auto'}}}
                   onRequestClose={ () => true }
                   effect={Effect.SlideFromRight}>

                    <div className="modal-header">
                        <button type="button" className="close" aria-hidden="true">&times;</button>
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
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                <p></p>

                                <div className="alert alert-warning">
                                    <a className="alert-link" href="#">Did you forget your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>

        );
    }
}

export default LoginPage