import React, { Component, PropTypes } from 'react'

class AvailableProject extends Component {
    static propTypes = {
        project: PropTypes.object
    }
    render() {
        return (
            <li><a href="#">
                {this.props.availableProject.project.projectName}</a>
            </li>
        );
    }
}

export default AvailableProject
