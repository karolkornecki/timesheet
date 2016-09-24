import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../actions'


const mapStateToProps = (state, ownProps) => ({
    availableProjects: state.availableProjects
        .filter(a => a.reservationId === ownProps.reservationId)
        .map(a => a.projectId)
        .map(id => state.projectsMap[id])
})


class AvailableProjectsListBox extends Component {

    render() {
        let availableProjects = this.props.availableProjects.map((project) => {
            return (
            <li key={project.id}><a href="#" onClick={()=> this.props.dispatch(selectProject(this.props.reservationId, project.id))}>
                {project.projectName}</a>
            </li>
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
