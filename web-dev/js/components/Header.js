import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import MenuElement from '../components/header/MenuElement'

import { logout } from '../routes/LoginPage/actions/index'
import client from '../client'

class Header extends Component {

    logout(e) {
        e.preventDefault()
        client({
            method: 'POST',
            path: '/api/logout'
        }).then(() => {
            this.props.dispatch(logout())
            browserHistory.push('/')
        })
    }

    render() {
        let { isAuthenticated } = this.props
        return (
            <div className="header">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                {isAuthenticated && <li>
                                    <Link to="/timesheet">
                                        <span className="glyphicon glyphicon-home"></span>
                                        <span className="hidden-sm">Timesheet</span>
                                    </Link>
                                </li>}
                                <li className="dropdown pointer">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="" id="account-menu">
                                        <span>
                                            <span className="glyphicon glyphicon-user"></span>
                                            <span className="hidden-sm">
                                                Account
                                            </span>
                                            <b className="caret"></b>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <MenuElement isAuthenticated={isAuthenticated} linkTo="/settings"
                                                     cssClasses="glyphicon glyphicon-wrench" menuText="Settings"/>
                                        <MenuElement isAuthenticated={isAuthenticated} linkTo="/password"
                                                     cssClasses="glyphicon glyphicon-lock" menuText="Password"/>
                                        <MenuElement isAuthenticated={isAuthenticated} linkTo="/sessions"
                                                     cssClasses="glyphicon glyphicon-cloud" menuText="Sessions"/>
                                        {isAuthenticated && <li><a href="" onClick={ (e) => this.logout(e) }>
                                            <span className="glyphicon glyphicon-log-out"></span>
                                            &#xA0;<span>Sign out</span>
                                        </a>
                                        </li>}
                                        <MenuElement isAuthenticated={!isAuthenticated} linkTo="/login"
                                                     cssClasses="glyphicon glyphicon-log-in" menuText="Sign in"/>
                                        <MenuElement isAuthenticated={!isAuthenticated} linkTo="/register"
                                                     cssClasses="glyphicon glyphicon-plus-sign" menuText="Register"/>
                                    </ul>
                                </li>
                                {isAuthenticated && <li className="dropdown pointer">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="" id="admin-menu">
                                        <span>
                                            <span className="glyphicon glyphicon-tower"></span>
                                            <span className="hidden-sm">Administration</span>
                                            <b className="caret"></b>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <MenuElement isAuthenticated={isAuthenticated} linkTo="/project_management"
                                                     cssClasses="glyphicon glyphicon-blackboard" menuText="Project management"/>
                                        <li><a><span className="glyphicon glyphicon-user"></span>&#xA0;<span>Team management</span></a>
                                        </li>
                                        <li><a><span className="glyphicon glyphicon-user"></span>&#xA0;<span>User management</span></a>
                                        </li>
                                        <li><a><span className="glyphicon glyphicon-dashboard"></span>&#xA0;<span>Metrics</span></a>
                                        </li>
                                        <li><a><span className="glyphicon glyphicon-heart"></span>&#xA0;
                                            <span>Health</span></a></li>
                                        <li><a><span className="glyphicon glyphicon-list-alt"></span>&#xA0;<span>Configuration</span></a>
                                        </li>
                                        <li><a><span className="glyphicon glyphicon-bell"></span>&#xA0;
                                            <span>Audits</span></a></li>
                                        <li><a><span className="glyphicon glyphicon-tasks"></span>&#xA0;
                                            <span>Logs</span></a></li>
                                        <li><a><span className="glyphicon glyphicon-book"></span>&#xA0;<span>API</span></a>
                                        </li>
                                        <li><a href='/h2-console'><span
                                            className="glyphicon glyphicon-hdd"></span>&#xA0;<span>Database</span></a>
                                        </li>
                                    </ul>
                                </li>}
                                {isAuthenticated && <li className="dropdown pointer">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="">
                                        <span>
                                            <span className="glyphicon glyphicon-flag"></span>
                                            <span className="hidden-sm">Language</span>
                                            <b className="caret"></b>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="" data-toggle="collapse">English</a>
                                        </li>
                                    </ul>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.account.isAuthenticated
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch: dispatch
})

Header = connect(
    mapStateToProps
)(Header)

export default Header
