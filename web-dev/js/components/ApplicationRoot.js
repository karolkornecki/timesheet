import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {Route, Router, IndexRoute, browserHistory} from "react-router"

import Layout from './Layout'
import TimesheetForm from '../routes/TimesheetPage/components/TimesheetForm'
import RegistrationForm from '../routes/RegistrationPage/components/RegistrationForm'
import SettingsForm from '../routes/SettingPage/components/SettingsForm'
import PasswordForm from '../routes/PasswordPage/components/PasswordForm'
import LoginForm from '../routes/LoginPage/containers/LoginForm'
import SessionsForm from '../routes/SessionsPage/components/SessionsForm'
import ProjectForm from '../routes/ProjectPage/components/ProjectForm'

class ApplicationRoot extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={browserHistory}>
                    <Route path='/' component={Layout}>
                        <Route path='/timesheet' component={TimesheetForm}/>
                        <Route path='/register' component={RegistrationForm}/>
                        <Route path='/settings' component={SettingsForm}/>
                        <Route path='/password' component={PasswordForm}/>
                        <Route path='/login' component={LoginForm}/>
                        <Route path='/sessions' component={SessionsForm} />
                        <Route path='/project_management' component={ProjectForm} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default ApplicationRoot