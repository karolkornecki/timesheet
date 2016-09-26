import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {Route, Router, browserHistory} from "react-router"

import TimesheetBox from './TimesheetBox'
import RegistrationForm from './RegistrationForm'

class ApplicationRoot extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={browserHistory}>
                    <Route path='/' component={TimesheetBox}/>
                </Router>
            </Provider>
        );
    }
}

export default ApplicationRoot