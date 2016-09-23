import React, { Component } from 'react'
import AvailableProject from './AvailableProject'
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => ({
    availableProjects: state.availableProjects
        .filter(a => a.reservationId === ownProps.reservationId)
        .map(a => a.projectId)
        .map(id => state.projectsMap[id])
})


class AvailableProjectsListBox extends Component {

    render() {
        var availableProjects = this.props.availableProjects.map(function (project) {
            return (
                <AvailableProject key={project.id} projectId={project.id}/>
            );
        });
        return (
            <ul className="dropdown-menu">
                {availableProjects}
            </ul>
        );
    }
}

AvailableProjectsListBox = connect(mapStateToProps)(AvailableProjectsListBox);

export default AvailableProjectsListBox
