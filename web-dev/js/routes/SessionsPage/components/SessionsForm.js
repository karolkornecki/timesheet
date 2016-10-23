import React, { Component } from 'react';
import client from '../../../client'

class SessionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            showErrorMsg: false,
            showSuccessMsg: false
        };
        this.invalidate = this.invalidate.bind(this);
    }

    componentWillMount() {
        client({
            method: 'GET',
            path: '/api/account/sessions'
        }).then((response) => {
            this.setState({sessions: response.entity})
        }).catch((error) => {
            console.error(error);
        })
    }

    invalidate(series) {
        client({
            method: 'DELETE',
            path: '/api/account/sessions/' + encodeURIComponent(series)
        }).then(() => {
            return client({
                method: 'GET',
                path: '/api/account/sessions'
            })
        }).then((response) => {
            this.setState({
                sessions: response.entity,
                showSuccessMsg: true,
                showErrorMsg: false
            })
        }).catch((error) => {
            console.error(error);
            this.setState({
                showSuccessMsg: false,
                showErrorMsg: true
            })
        })
    }


    render() {
        let sessions = this.state.sessions.map((session) => {
            return (
                <tr key={session.series}>
                    <td>{session.ipAddress}</td>
                    <td>{session.userAgent}</td>
                    <td>{session.tokenDate}</td>
                    <td>
                        <button type="button" onClick={ ()=> this.invalidate(session.series)}
                                className="btn btn-primary">
                            Invalidate
                        </button>
                    </td>
                </tr>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h2>Active sessions for [<b>Test</b>]</h2>

                        {this.state.showSuccessMsg && <div className="alert alert-success">
                            <strong>Session invalidated!</strong>
                        </div>}
                        {this.state.showErrorMsg && <div className="alert alert-danger">
                            <strong>An error has occured!</strong>The session could not be invalidated.
                        </div>}

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>IP Address</th>
                                    <th>User agent</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {sessions}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SessionsForm