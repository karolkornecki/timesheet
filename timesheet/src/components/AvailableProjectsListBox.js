import React, { Component, PropTypes } from 'react'
import AvailableProject from './AvailableProject'

class AvailableProjectsListBox extends Component {
    static propTypes = {
        reservation: PropTypes.object
    }
    render() {
        var availableProjects = this.props.reservation.availableProjects.map(function (availableProject) {
            return (
                <AvailableProject key={availableProject.project.id}
                                  availableProject={availableProject}/>
            );
        });
        return (
            <ul className="dropdown-menu">
                {availableProjects}
            </ul>
        );
    }
}

export default AvailableProjectsListBox
